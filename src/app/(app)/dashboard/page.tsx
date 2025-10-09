
'use client';
import { useState, useEffect, useMemo } from 'react';
import { StudyPackCard } from "@/components/study-pack-card";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookOpen, BarChart, ArrowRight, Wand2, Flame } from "lucide-react";
import Link from "next/link";
import { useUser, useFirestore, useCollection, useDoc, useMemoFirebase } from "@/firebase";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import type { StudyPack, ReviewSession, Subject } from '@/lib/types';
import { collection, query, orderBy, doc, updateDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

function AddToCollectionDialog({
  isOpen,
  onOpenChange,
  studyPack,
  subjects,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  studyPack: StudyPack | null;
  subjects: Subject[] | null;
}) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (studyPack?.subjectId) {
      setSelectedSubjectId(studyPack.subjectId);
    } else {
      setSelectedSubjectId(null);
    }
  }, [studyPack]);

  const handleSave = async () => {
    if (!user || !firestore || !studyPack || !selectedSubjectId) return;

    setIsSaving(true);
    try {
      const studyPackRef = doc(firestore, `users/${user.uid}/studyPacks`, studyPack.id);
      await updateDoc(studyPackRef, {
        subjectId: selectedSubjectId,
      });
      toast({
        title: "Study Pack Updated",
        description: `"${studyPack.title}" has been added to the collection.`,
      });
      onOpenChange(false);
    } catch (error) {
      console.error("Error updating study pack:", error);
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Could not add the study pack to the collection.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add "{studyPack?.title}" to a Collection</DialogTitle>
          <DialogDescription>
            Organize your study material by assigning it to a collection.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Select
            onValueChange={setSelectedSubjectId}
            defaultValue={selectedSubjectId || undefined}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a collection" />
            </SelectTrigger>
            <SelectContent>
              {subjects && subjects.length > 0 ? (
                subjects.map((subject) => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.title}
                  </SelectItem>
                ))
              ) : (
                <div className="p-4 text-sm text-muted-foreground">No collections found. <Link href="/collections" className="text-primary underline">Create one?</Link></div>
              )}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave} disabled={isSaving || !selectedSubjectId}>
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const [packToAddToCollection, setPackToAddToCollection] = useState<StudyPack | null>(null);
  
  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isLoadingProfile } = useDoc<{ fullName: string }>(userProfileRef);

  const userName = userProfile?.fullName?.split(' ')[0] || "Learner";
  
  const studyPacksQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/studyPacks`), orderBy('createdAt', 'desc'));
  }, [firestore, user]);
  
  const subjectsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/subjects`), orderBy("createdAt", "desc"));
  }, [user, firestore]);

  const reviewSessionsQuery = useMemoFirebase(() => {
    if (!user) return null;
    return query(collection(firestore, `users/${user.uid}/reviewSessions`), orderBy('reviewDate', 'desc'));
    }, [firestore, user]);

  const { data: studyPacks, isLoading: isLoadingPacks } = useCollection<StudyPack>(studyPacksQuery);
  const { data: subjects, isLoading: isLoadingSubjects } = useCollection<Subject>(subjectsQuery);
  const { data: reviewSessions, isLoading: isLoadingSessions } = useCollection<ReviewSession>(reviewSessionsQuery);
  
  const isLoading = isUserLoading || isLoadingProfile || isLoadingPacks || isLoadingSessions || isLoadingSubjects;

  const processedStudyPacks = useMemo(() => {
    if (!studyPacks) return [];
    return studyPacks.map(pack => {
      const learnedCount = pack.flashcards?.filter(fc => fc.isLearned).length || 0;
      const totalCount = pack.flashcards?.length || 0;
      const progress = totalCount > 0 ? Math.round((learnedCount / totalCount) * 100) : 0;
      return { ...pack, progress };
    });
  }, [studyPacks]);


  const analytics = useMemo(() => {
    if (!reviewSessions) {
      return {
        cardsLearned: 0,
        accuracy: 0,
        minutesStudied: 0,
        streak: 0,
      };
    }

    const cardsLearned = new Set(reviewSessions.map(s => s.flashcardId)).size;
    
    const correctReviews = reviewSessions.filter(s => s.difficultyRating !== 'hard').length;
    const accuracy = reviewSessions.length > 0 ? Math.round((correctReviews / reviewSessions.length) * 100) : 0;

    const minutesStudied = reviewSessions.length * 0.5; // Assuming 30s per card

    // Calculate streak
    let streak = 0;
    if (reviewSessions.length > 0) {
        const uniqueDates = [...new Set(reviewSessions.map(s => new Date(s.reviewDate).toDateString()))]
            .map(dateStr => new Date(dateStr))
            .sort((a, b) => b.getTime() - a.getTime());

        if (uniqueDates.length > 0) {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const mostRecentReviewDay = new Date(uniqueDates[0]);
            mostRecentReviewDay.setHours(0, 0, 0, 0);

            const dayDiff = (today.getTime() - mostRecentReviewDay.getTime()) / (1000 * 60 * 60 * 24);

            if (dayDiff <= 1) {
                streak = 1;
                for (let i = 0; i < uniqueDates.length - 1; i++) {
                    const current = new Date(uniqueDates[i]);
                    current.setHours(0,0,0,0);
                    const previous = new Date(uniqueDates[i+1]);
                    previous.setHours(0,0,0,0);
                    
                    const diff = (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);

                    if (diff === 1) {
                        streak++;
                    } else {
                        break;
                    }
                }
            }
        }
    }


    return {
      cardsLearned,
      accuracy,
      minutesStudied: Math.round(minutesStudied),
      streak,
    };
  }, [reviewSessions]);

  const hasStudyPacks = !isLoading && processedStudyPacks && processedStudyPacks.length > 0;

  const renderSkeletons = () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="flex flex-col h-full">
          <CardHeader>
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="pt-4">
              <Skeleton className="h-2 w-1/4 mb-1" />
              <Skeleton className="h-4 w-full" />
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );

  const renderAnalyticsSkeletons = () => (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex justify-between items-center text-sm">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </>
  );

  return (
    <div className="container mx-auto relative">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">
          Welcome back, {isLoading ? <Skeleton className="h-10 w-40 inline-block" /> : `${userName} 👋`}
        </h1>
        <p className="text-muted-foreground text-lg mt-1">Ready to create your next study set?</p>
      </motion.div>

      <AddToCollectionDialog 
        isOpen={!!packToAddToCollection}
        onOpenChange={(open) => !open && setPackToAddToCollection(null)}
        studyPack={packToAddToCollection}
        subjects={subjects}
      />

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <motion.div custom={0} initial="hidden" animate="visible" variants={cardVariants}>
            <Link href="/create">
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Wand2 className="text-primary"/> Generate New Material</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Paste a link, text, or upload a file to start.</p>
                    </CardContent>
                    <CardContent>
                        <ArrowRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                </Card>
            </Link>
        </motion.div>
        <motion.div custom={1} initial="hidden" animate="visible" variants={cardVariants}>
             <a href="#recent-activity">
                <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookOpen className="text-primary"/> My Study Sets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Browse and manage all your created packs.</p>
                    </CardContent>
                    <CardContent>
                        <ArrowRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </CardContent>
                </Card>
            </a>
        </motion.div>
        <motion.div custom={2} initial="hidden" animate="visible" variants={cardVariants}>
            <Card className="bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary/50 hover:scale-105 transition-all duration-300 h-full">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart className="text-primary"/> Progress & Analytics</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    {isLoading ? renderAnalyticsSkeletons() : (
                        <>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Cards Learned</span>
                                <span className="font-bold">{analytics.cardsLearned}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Accuracy</span>
                                <span className="font-bold">{analytics.accuracy}%</span>
                            </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Minutes Studied</span>
                                <span className="font-bold">{analytics.minutesStudied}</span>
                            </div>
                        </>
                    )}
                </CardContent>
                 <CardFooter className="pt-4">
                    {isLoading ? <Skeleton className="h-5 w-2/3" /> : analytics.streak > 0 ? (
                        <div className="flex items-center gap-2 text-sm font-semibold text-orange-400">
                            <Flame className="h-4 w-4" />
                            <span>{analytics.streak} day streak!</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>Start a new streak today!</span>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </motion.div>
      </div>

        {/* Recent Activity */}
        <div id="recent-activity">
            <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
            {isLoading && renderSkeletons()}
            {!isLoading && hasStudyPacks && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {processedStudyPacks.map((pack, i) => (
                         <motion.div key={pack.id} custom={i} initial="hidden" animate="visible" variants={cardVariants}>
                            <StudyPackCard pack={pack} onAddToCollectionClick={setPackToAddToCollection} />
                         </motion.div>
                    ))}
                </div>
            )}
            {!isLoading && !hasStudyPacks && (
                 <div className="text-center py-20 px-6 rounded-2xl bg-white/5 border border-dashed border-white/10 flex flex-col items-center">
                    <div className="mb-4 text-6xl">📚</div>
                    <h3 className="text-xl font-semibold mb-2">No study sets yet</h3>
                    <p className="text-muted-foreground mb-6 max-w-sm">It looks like you haven't created any study material. Let's make your first one!</p>
                    <Button asChild className="bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
                        <Link href="/create">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Start Creating
                        </Link>
                    </Button>
                </div>
            )}
        </div>

        {/* Floating Action Button */}
        <Link href="/create">
             <motion.div
                initial={{ scale: 0, y: 100 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                 whileHover={{ scale: 1.1 }}
                 className="fixed bottom-8 right-8 z-50"
             >
                <Button size="lg" className="rounded-full shadow-2xl shadow-primary/30 bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 h-16 w-16 p-0 flex items-center justify-center">
                     <PlusCircle className="h-8 w-8 text-white" />
                     <span className="sr-only">New Study Set</span>
                </Button>
            </motion.div>
        </Link>
    </div>
  );
}
