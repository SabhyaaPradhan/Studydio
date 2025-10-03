"use client";

import { useState } from 'react';
import type { Flashcard as FlashcardType } from "@/lib/types";
import { Button } from './ui/button';
import { CornerUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Flashcard({ flashcard }: { flashcard: FlashcardType }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
  // Reset flip state when card changes
  useState(() => {
    setIsFlipped(false);
  });

  return (
    <div className="w-full max-w-2xl h-80 perspective-1000">
        <div
            className={cn("relative w-full h-full transition-transform duration-700 preserve-3d", isFlipped ? "rotate-y-180" : "")}
            onClick={handleFlip}
        >
            {/* Front of the card */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 rounded-lg border bg-card text-card-foreground shadow-lg cursor-pointer">
                <p className="text-xl md:text-2xl font-semibold text-center">{flashcard.front}</p>
                <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 text-muted-foreground">
                    <CornerUpRight className="h-5 w-5" />
                </Button>
            </div>
            {/* Back of the card */}
            <div className="absolute w-full h-full backface-hidden flex items-center justify-center p-6 rounded-lg border bg-card text-card-foreground shadow-lg cursor-pointer rotate-y-180">
                <p className="text-lg md:text-xl text-center">{flashcard.back}</p>
                 <Button variant="ghost" size="icon" className="absolute bottom-4 right-4 text-muted-foreground">
                    <CornerUpRight className="h-5 w-5" />
                </Button>
            </div>
        </div>
        <style jsx>{`
            .perspective-1000 {
                perspective: 1000px;
            }
            .preserve-3d {
                transform-style: preserve-3d;
            }
            .rotate-y-180 {
                transform: rotateY(180deg);
            }
            .backface-hidden {
                backface-visibility: hidden;
                -webkit-backface-visibility: hidden;
            }
        `}</style>
    </div>
  );
}
