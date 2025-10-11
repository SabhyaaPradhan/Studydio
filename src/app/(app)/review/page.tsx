
"use client";

import { useState, useMemo, useEffect } from 'react';
import { useUser, useFirestore, useCollection, useDoc, updateDocumentNonBlocking, useMemoFirebase } from "@/firebase";
import { collection, doc, query, where, limit, getDocs, writeBatch } from 'firebase/firestore';
import { Flashcard as FlashcardComponent } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame, Smile, Meh, Frown, Loader2 } from 'lucide-react';
import type { StudyPack, Flashcard as FlashcardType, ReviewSession } from '@/lib/types';
import { smartScheduler } from '@/ai/flows/smart-scheduler';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { Skeleton } from '@/components/ui/skeleton';


export default function ReviewPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const [reviewQueue, setReviewQueue] = useState<FlashcardType[]>([]);
    const [studyPackMap, setStudyPackMap] = useState<Record<string, StudyPack>>({});
    const [isLoadingQueue, setIsLoadingQueue] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [streak, setStreak] = useState(0);

     const reviewSessionsQuery = useMemoFirebase(() => {
        if (!user) return null;
        return query(collection(firestore, `users/${user.uid}/reviewSessions`), where("reviewDate", ">=", new Date(new Date().setDate(new Date().getDate() - 30)).toISOString()));
    }, [firestore, user]);

    const { data: recentReviewSessions, isLoading: isLoadingSessions } = useCollection<ReviewSession>(reviewSessionsQuery);


     useEffect(() => {
        if (isUserLoading || isLoadingSessions) return;

        const calculateStreak = () => {
            if (!recentReviewSessions || recentReviewSessions.length === 0) {
                setStreak(0);
                return;
            }
             const uniqueDates = [...new Set(recentReviewSessions.map(s => new Date(s.reviewDate).toDateString()))]
                .map(dateStr => new Date(dateStr))
                .sort((a, b) => b.getTime() - a.getTime());

            if (uniqueDates.length === 0) {
                setStreak(0);
                return;
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const mostRecentReviewDay = new Date(uniqueDates[0]);
            mostRecentReviewDay.setHours(0, 0, 0, 0);

            const dayDiff = (today.getTime() - mostRecentReviewDay.getTime()) / (1000 * 60 * 60 * 24);

            if (dayDiff > 1) {
                setStreak(0); // Streak is broken
                return;
            }
            
            let currentStreak = dayDiff <= 1 ? 1 : 0;
            if (currentStreak === 0) {
                setStreak(0);
                return;
            }

            for (let i = 0; i < uniqueDates.length - 1; i++) {
                const current = new Date(uniqueDates[i]);
                const previous = new Date(uniqueDates[i + 1]);
                const diff = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);
                if (diff === 1) {
                    currentStreak++;
                } else {
                    break;
                }
            }
            setStreak(currentStreak);
        };

        calculateStreak();
    }, [recentReviewSessions, isUserLoading, isLoadingSessions]);


    useEffect(() => {
        async function fetchReviewQueue() {
            if (!user || !firestore) return;

            setIsLoadingQueue(true);
            try {
                const packsRef = collection(firestore, `users/${user.uid}/studyPacks`);
                const packsSnapshot = await getDocs(packsRef);
                const allFlashcards: FlashcardType[] = [];
                const packMap: Record<string, StudyPack> = {};
                
                packsSnapshot.forEach(doc => {
                    const pack = { id: doc.id, ...doc.data() } as StudyPack;
                    packMap[pack.id] = pack;
                    if (pack.flashcards) {
                        const cardsToReview = pack.flashcards.filter(fc => {
                            if (fc.isLearned) return false;
                            if (!fc.nextReviewDate) return true;
                            return new Date(fc.nextReviewDate) <= new Date();
                        });
                        allFlashcards.push(...cardsToReview.map(fc => ({...fc, studyPackId: pack.id} as FlashcardType)));
                    }
                });

                // Simple shuffle
                allFlashcards.sort(() => Math.random() - 0.5);

                setReviewQueue(allFlashcards);
                setStudyPackMap(packMap);

            } catch (error) {
                console.error("Error fetching review queue:", error);
            } finally {
                setIsLoadingQueue(false);
            }
        }

        if (!isUserLoading) {
            fetchReviewQueue();
        }

    }, [user, firestore, isUserLoading]);

    const handleDifficultySelect = async (difficulty: 'easy' | 'medium' | 'hard') => {
        if (!user || !firestore) return;
        
        const currentCard = reviewQueue[currentIndex];
        const studyPackId = (currentCard as any).studyPackId;
        const pack = studyPackMap[studyPackId];
        if(!pack) return;

        const now = new Date();

        // 1. Log the review session
        const reviewSessionData: Omit<ReviewSession, 'id'> = {
            userId: user.uid,
            flashcardId: currentCard.id,
            reviewDate: now.toISOString(),
            difficultyRating: difficulty
        };
        const reviewSessionsRef = collection(firestore, `users/${user.uid}/reviewSessions`);
        addDocumentNonBlocking(reviewSessionsRef, reviewSessionData);


        // 2. Call scheduler for next review date
        const schedulerInput = {
            flashcardContent: `${currentCard.front} / ${currentCard.back}`,
            lastReviewed: currentCard.lastReviewed || undefined,
            easinessFactor: currentCard.easinessFactor,
            repetitions: currentCard.repetitions,
            interval: currentCard.interval
        };

        const schedule = await smartScheduler(schedulerInput);

        // 3. Update the flashcard in its study pack
        const updatedFlashcards = pack.flashcards.map(fc => {
            if (fc.id === currentCard.id) {
                return {
                    ...fc,
                    lastReviewed: now.toISOString(),
                    nextReviewDate: schedule.nextReviewDate,
                    isLearned: difficulty !== 'hard', // Mark as learned if not hard
                    // Normally you'd update EF, reps, interval from scheduler, but it's not returning them
                };
            }
            return fc;
        });

        const studyPackRef = doc(firestore, `users/${user.uid}/studyPacks`, studyPackId);
        updateDocumentNonBlocking(studyPackRef, { flashcards: updatedFlashcards });

        // Update streak if it's a new day
        const lastSessionDate = recentReviewSessions?.[0]?.reviewDate ? new Date(recentReviewSessions[0].reviewDate).toDateString() : null;
        const todayDate = new Date().toDateString();
        if(lastSessionDate !== todayDate) {
             setStreak(s => s + 1);
        }

        // 4. Move to next card
        if(currentIndex < reviewQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // End of review session
            setCurrentIndex(prev => prev + 1);
        }
    }
    
    if (isLoadingQueue || isUserLoading) {
        return (
            <div className="container mx-auto max-w-3xl">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <Skeleton className="h-10 w-48 mb-2" />
                        <Skeleton className="h-5 w-64" />
                    </div>
                    <Skeleton className="h-8 w-12" />
                </div>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent className="flex flex-col items-center gap-6">
                        <Skeleton className="w-full max-w-2xl h-80" />
                        <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                           <Skeleton className="h-16 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    if (reviewQueue.length === 0) {
        return (
            <div className="container mx-auto text-center py-20">
                <div className="text-5xl mb-4">🎉</div>
                <h1 className="text-2xl font-bold">All caught up!</h1>
                <p className="text-muted-foreground">You have no cards to review today. Great job!</p>
            </div>
        );
    }
    
    if (currentIndex >= reviewQueue.length) {
        return (
             <div className="container mx-auto text-center py-20">
                <div className="text-5xl mb-4">🙌</div>
                <h1 className="text-2xl font-bold">Review Complete!</h1>
                <p className="text-muted-foreground">You've finished your review session for today. Keep the streak going tomorrow!</p>
                 <div className="flex items-center justify-center gap-2 mt-4 text-orange-500 font-bold">
                    <Flame className="h-6 w-6" />
                    <span>{streak} day streak!</span>
                </div>
            </div>
        )
    }

    const currentCard = reviewQueue[currentIndex];

  return (
    <div className="container mx-auto max-w-3xl">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h1 className="text-3xl font-bold">Daily Review</h1>
                <p className="text-muted-foreground">Strengthen your memory with spaced repetition.</p>
            </div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-lg">
                <Flame className="h-6 w-6" />
                <span>{streak}</span>
            </div>
        </div>

      <Card>
        <CardHeader>
            <CardTitle>Card {currentIndex + 1} of {reviewQueue.length}</CardTitle>
            <CardDescription>How well did you remember this?</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-6">
            <FlashcardComponent flashcard={currentCard} />
            <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                <Button variant="outline" className="h-16 flex-col gap-1 text-green-600 hover:bg-green-50 hover:text-green-700" onClick={() => handleDifficultySelect('easy')}>
                    <Smile className="h-6 w-6" />
                    <span>Easy</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-1 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700" onClick={() => handleDifficultySelect('medium')}>
                    <Meh className="h-6 w-6" />
                    <span>Medium</span>
                </Button>
                <Button variant="outline" className="h-16 flex-col gap-1 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleDifficultySelect('hard')}>
                    <Frown className="h-6 w-6" />
                    <span>Hard</span>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
