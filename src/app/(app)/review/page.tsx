"use client";

import { useState, useMemo } from 'react';
import { mockStudyPacks } from "@/lib/mock-data";
import { Flashcard } from "@/components/flashcard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Flame, Smile, Meh, Frown } from 'lucide-react';

export default function ReviewPage() {
    const reviewQueue = useMemo(() => mockStudyPacks.flatMap(p => p.flashcards), []);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [streak, setStreak] = useState(12);

    const handleDifficultySelect = (difficulty: 'easy' | 'medium' | 'hard') => {
        // Here you would call the smartScheduler GenAI flow
        console.log(`Card marked as ${difficulty}`);
        if(difficulty !== 'hard'){
            setStreak(s => s + 1);
        }
        if(currentIndex < reviewQueue.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            // End of review session
            setCurrentIndex(prev => prev + 1);
        }
    }

    if (reviewQueue.length === 0) {
        return (
            <div className="container mx-auto text-center">
                <h1 className="text-2xl font-bold">All caught up!</h1>
                <p className="text-muted-foreground">You have no cards to review today. Great job!</p>
            </div>
        );
    }
    
    if (currentIndex >= reviewQueue.length) {
        return (
             <div className="container mx-auto text-center">
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
            <Flashcard flashcard={currentCard} />
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
