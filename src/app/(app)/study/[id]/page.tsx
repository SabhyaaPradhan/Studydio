
"use client";

import { useState, useEffect, use } from 'react';
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
import { useDoc, useFirestore, useUser, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';


export default function StudyPackPage({ params: { id } }: { params: { id: string } }) {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const studyPackRef = useMemoFirebase(() => {
    if (!user || !id) return null;
    return doc(firestore, `users/${user.uid}/studyPacks/${id}`);
  }, [firestore, user, id]);

  const { data: studyPack, isLoading } = useDoc<StudyPack>(studyPackRef);

  useEffect(() => {
    setCurrentCardIndex(0);
    setQuizAnswers({});
    setSubmitted(false);
  }, [id]);

  if (isLoading) {
    return (
        <div className="container mx-auto">
            <Skeleton className="h-8 w-2/3 mb-1" />
            <Skeleton className="h-5 w-1/3 mb-6" />

            <div className="grid w-full grid-cols-3 gap-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <Card className="mt-2">
                <CardHeader>
                    <Skeleton className="h-6 w-1/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                    <Skeleton className="w-full h-80" />
                </CardContent>
            </Card>
        </div>
    );
  }

  if (!studyPack) {
    notFound();
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

  // Convert Firestore Timestamp to JS Date for display if needed
  const createdAtDate = studyPack.createdAt && typeof (studyPack.createdAt as any).toDate === 'function' 
    ? (studyPack.createdAt as any).toDate() 
    : new Date(studyPack.createdAt);


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
