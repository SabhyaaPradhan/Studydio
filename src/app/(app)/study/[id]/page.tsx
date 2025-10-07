
"use client";

import { useState, useEffect, use } from 'react';
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


export default function StudyPackPage({ params }: { params: { id: string } }) {
  const { id } = use(params);
  const [studyPack, setStudyPack] = useState<StudyPack | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // First, try to find the pack in localStorage
    const storedPacks = localStorage.getItem('userStudyPacks');
    let packFound = false;
    if (storedPacks) {
        try {
            const userPacks = JSON.parse(storedPacks);
            const pack = userPacks.find((p: StudyPack) => p.id === id);
            if (pack) {
                setStudyPack(pack);
                packFound = true;
            }
        } catch (e) {
            console.error("Failed to parse study packs from localStorage", e);
        }
    }
    
    // If not found in localStorage, check mock data
    if (!packFound) {
        const pack = mockStudyPacks.find((p) => p.id === id);
        if (pack) {
            setStudyPack(pack);
        }
    }
  }, [id]);


  if (!studyPack) {
      if (typeof window !== 'undefined') {
          // After useEffect has run and still no pack, it's a true 404
          const packFromMocks = mockStudyPacks.find((p) => p.id === id);
          const packsFromStorage = JSON.parse(localStorage.getItem('userStudyPacks') || '[]');
          const packFromStorage = packsFromStorage.find((p: StudyPack) => p.id === id);

          if (!packFromMocks && !packFromStorage) {
            return notFound();
          }
      }
      // Show loading state until useEffect completes
      return <div>Loading...</div>;
  }
  
  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % studyPack.flashcards.length);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + studyPack.flashcards.length) % studyPack.flashcards.length);
  };

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
