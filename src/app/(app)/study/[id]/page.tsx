
"use client";

import { useState, useEffect } from 'react';
import { mockStudyPacks } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flashcard } from "@/components/flashcard";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, FileText, Bot, BookOpen } from 'lucide-react';
import ScrollFloat from '@/components/ScrollFloat';
import type { StudyPack } from '@/lib/types';


export default function StudyPackPage({ params: { id } }: { params: { id: string } }) {
  const [studyPack, setStudyPack] = useState<StudyPack | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    if (id === 'new-pack-from-creation') {
        const storedPack = localStorage.getItem('newStudyPack');
        if (storedPack) {
            try {
                const parsedPack = JSON.parse(storedPack);
                // Simple validation to ensure it's a valid pack
                if(parsedPack.id && parsedPack.title) {
                    setStudyPack(parsedPack);
                }
            } catch (e) {
                console.error("Failed to parse study pack from localStorage", e);
                // If parsing fails, don't set the pack, leading to the notFound() call later
            }
        }
    } else {
        const pack = mockStudyPacks.find((p) => p.id === id);
        if (pack) {
            setStudyPack(pack);
        }
    }
  }, [id]);


  if (!studyPack) {
    // This can be a loading state or a not found page if the id is invalid after checking.
    // Let's check mock data as a fallback before showing a not found error, but not for 'new-pack'
    if (id !== 'new-pack-from-creation') {
        const pack = mockStudyPacks.find((p) => p.id === id);
        if (pack) {
            // This is a temporary state before useEffect runs
            return <div>Loading study pack...</div>
        }
    } else if (typeof window !== 'undefined' && !localStorage.getItem('newStudyPack')) {
         // If it's a new pack and nothing is in local storage, it's likely an invalid direct navigation
         return notFound();
    }
    
    // Default loading state, but if it persists and no pack is found, it will lead to not found eventually
    // after useEffect runs and fails to set a pack.
    if (typeof window !== 'undefined' && studyPack === null) {
      const packFromMocks = mockStudyPacks.find((p) => p.id === id);
      if (!packFromMocks && id !== 'new-pack-from-creation') {
        return notFound();
      }
    }


    return <div>Loading...</div>;
  }
  
  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % studyPack.flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + studyPack.flashcards.length) % studyPack.flashcards.length);
  };
  
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setQuizAnswers(prev => ({...prev, [questionId]: value}));
  };

  const handleSubmitQuiz = () => setSubmitted(true);

  return (
    <div className="container mx-auto">
        <ScrollFloat tag="h1" className="text-3xl font-bold mb-1" textClassName="scroll-float-text-h1">{studyPack.title}</ScrollFloat>
        <p className="text-muted-foreground mb-6">Let's get studying. You've got this!</p>

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="flashcards"><BookOpen className="mr-2 h-4 w-4" />Flashcards</TabsTrigger>
          <TabsTrigger value="quiz"><Bot className="mr-2 h-4 w-4" />Quiz</TabsTrigger>
          <TabsTrigger value="summary"><FileText className="mr-2 h-4 w-4" />Summary</TabsTrigger>
        </TabsList>
        <TabsContent value="flashcards">
          <Card>
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>Click to flip the card. Use the arrows to navigate.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-muted-foreground">Progress</span>
                        <span className="text-sm font-medium">{studyPack.flashcards.length > 0 ? currentCardIndex + 1 : 0} / {studyPack.flashcards.length}</span>
                    </div>
                    <Progress value={studyPack.flashcards.length > 0 ? ((currentCardIndex + 1) / studyPack.flashcards.length) * 100 : 0} />
                </div>
              {studyPack.flashcards.length > 0 ? (
                <Flashcard flashcard={studyPack.flashcards[currentCardIndex]} />
              ) : (
                <div className="text-center text-muted-foreground p-8">No flashcards available for this pack.</div>
              )}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handlePrevCard} disabled={studyPack.flashcards.length <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextCard} disabled={studyPack.flashcards.length <= 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="quiz">
          <Card>
            <CardHeader>
              <CardTitle>Quiz</CardTitle>
              <CardDescription>Test your knowledge with this short quiz.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {studyPack.quiz && studyPack.quiz.length > 0 ? studyPack.quiz.map((q, index) => (
                    <div key={q.id}>
                        <p className="font-medium mb-4">{index + 1}. {q.question}</p>
                        <RadioGroup 
                            onValueChange={(value) => handleAnswerChange(q.id, value)}
                            disabled={submitted}
                            value={quizAnswers[q.id]}
                        >
                            {q.options.map((option, i) => {
                                let colorClass = "";
                                if(submitted) {
                                    if(option === q.correctAnswer) {
                                        colorClass = "text-green-600";
                                    } else if (quizAnswers[q.id] === option && option !== q.correctAnswer) {
                                        colorClass = "text-red-600";
                                    }
                                }

                                return (
                                <div key={i} className={`flex items-center space-x-2 p-2 rounded-md ${submitted && quizAnswers[q.id] === option ? 'bg-muted' : ''}`}>
                                    <RadioGroupItem value={option} id={`${q.id}-${i}`} />
                                    <Label htmlFor={`${q.id}-${i}`} className={`flex-1 ${colorClass}`}>
                                        {option}
                                    </Label>
                                    {submitted && option === q.correctAnswer && <CheckCircle className="h-5 w-5 text-green-600" />}
                                    {submitted && quizAnswers[q.id] === option && option !== q.correctAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                                </div>
                            )})}
                        </RadioGroup>
                    </div>
                )) : (
                    <div className="text-center text-muted-foreground p-8">No quiz questions available for this pack.</div>
                )}
                 <Button onClick={handleSubmitQuiz} disabled={submitted || !studyPack.quiz || studyPack.quiz.length === 0}>Submit Quiz</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>AI Summary</CardTitle>
              <CardDescription>A concise summary of the content.</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-stone dark:prose-invert max-w-none">
              {studyPack.summary ? <p>{studyPack.summary}</p> : <div className="text-center text-muted-foreground p-8">No summary available for this pack.</div>}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// We can't use generateMetadata with 'use client' pages in this way.
// A different approach is needed for dynamic metadata if this page must be a client component.
// For now, we remove it to fix the build. A possible solution is to fetch metadata in a parent Server Component.
/*
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const pack = mockStudyPacks.find((p) => p.id === params.id);

  if (!pack) {
    return {
      title: "Study Pack Not Found",
    };
  }

  return {
    title: `${pack.title} - Studydio`,
    description: pack.summary || pack.contentSnippet,
    openGraph: {
      title: `${pack.title} - Studydio`,
      description: pack.summary || pack.contentSnippet,
      images: [
        {
          url: "https://picsum.photos/seed/studydio-og/1200/630",
          width: 1200,
          height: 630,
          alt: "Studydio - Learn anything, 10x faster",
        },
      ],
    },
  };
}
*/
