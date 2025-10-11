
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Flashcard } from "@/components/flashcard";
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight, CheckCircle, XCircle, FileText, Bot, BookOpen, MessageSquare, Send, User as UserIcon, Loader2 } from 'lucide-react';
import type { StudyPack } from '@/lib/types';
import { chatWithContent } from '@/ai/flows/chat-with-content';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


type ChatMessage = {
    role: 'user' | 'model';
    content: string;
};

// The client component now receives the initial data as a prop.
export default function StudyPackClientPage({ id, initialStudyPack }: { id: string, initialStudyPack: StudyPack }) {
  // The state is initialized with the data passed from the server.
  const [studyPack] = useState<StudyPack>(initialStudyPack);
  
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatScrollAreaRef = useRef<HTMLDivElement>(null);


  const handleNextCard = () => {
    if (!studyPack || !studyPack.flashcards) return;
    setCurrentCardIndex((prev) => (prev + 1) % studyPack.flashcards.length);
  };

  const handlePrevCard = () => {
    if (!studyPack || !studyPack.flashcards) return;
    setCurrentCardIndex((prev) => (prev - 1 + studyPack.flashcards.length) % studyPack.flashcards.length);
  };

  const handleAnswerChange = (questionId: string, value: string) => {
    setQuizAnswers(prev => ({...prev, [questionId]: value}));
  };

  const handleSubmitQuiz = () => setSubmitted(true);
  
  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const newHumanMessage: ChatMessage = { role: 'user', content: chatInput };
    setChatHistory(prev => [...prev, newHumanMessage]);
    setChatInput('');
    setIsChatLoading(true);

    try {
        const fullContent = studyPack.summary + '\n' + studyPack.flashcards.map(f => `${f.front}: ${f.back}`).join('\n');
        
        const result = await chatWithContent({
            content: fullContent,
            question: chatInput,
            history: chatHistory.map(h => ({ role: h.role, content: h.content }))
        });

        const newAiMessage: ChatMessage = { role: 'model', content: result.answer };
        setChatHistory(prev => [...prev, newAiMessage]);

    } catch (error) {
        console.error("Chat error:", error);
        const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I ran into an error. Please try again."};
        setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  }

   useEffect(() => {
    if (chatScrollAreaRef.current) {
      chatScrollAreaRef.current.scrollTo({
        top: chatScrollAreaRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatHistory]);
  
  return (
    <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-1">{studyPack.title}</h1>
        <p className="text-muted-foreground mb-6">Let's get studying. You've got this!</p>

      <Tabs defaultValue="flashcards" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="flashcards"><BookOpen className="mr-2 h-4 w-4" />Flashcards</TabsTrigger>
          <TabsTrigger value="quiz"><Bot className="mr-2 h-4 w-4" />Quiz</TabsTrigger>
          <TabsTrigger value="summary"><FileText className="mr-2 h-4 w-4" />Summary</TabsTrigger>
          <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" />Chat</TabsTrigger>
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
                        <span className="text-sm font-medium">{studyPack.flashcards?.length > 0 ? currentCardIndex + 1 : 0} / {studyPack.flashcards?.length || 0}</span>
                    </div>
                    <Progress value={studyPack.flashcards?.length > 0 ? ((currentCardIndex + 1) / studyPack.flashcards.length) * 100 : 0} />
                </div>
              {studyPack.flashcards && studyPack.flashcards.length > 0 ? (
                <Flashcard flashcard={studyPack.flashcards[currentCardIndex]} />
              ) : (
                <div className="text-center text-muted-foreground p-8">No flashcards available for this pack.</div>
              )}
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" onClick={handlePrevCard} disabled={!studyPack.flashcards || studyPack.flashcards.length <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleNextCard} disabled={!studyPack.flashcards || studyPack.flashcards.length <= 1}>
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
                    <div key={q.id || index}>
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
         <TabsContent value="chat">
            <Card>
                <CardHeader>
                    <CardTitle>AI Chat Tutor</CardTitle>
                    <CardDescription>Ask questions about the content of this study pack.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col h-[500px]">
                    <ScrollArea className="flex-1 pr-4 -mr-4" ref={chatScrollAreaRef}>
                        <div className="space-y-6">
                            {chatHistory.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-4 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'model' && (
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-lg p-3 max-w-[80%] ${msg.role === 'model' ? 'bg-muted' : 'bg-primary text-primary-foreground'}`}>
                                        <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                                    </div>
                                    {msg.role === 'user' && (
                                         <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><UserIcon className="w-5 h-5" /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isChatLoading && (
                                <div className="flex items-start gap-4">
                                     <Avatar className="w-8 h-8 border">
                                        <AvatarFallback><Bot className="w-5 h-5" /></AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-lg p-3 bg-muted flex items-center">
                                       <Loader2 className="w-5 h-5 animate-spin"/>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                    <form onSubmit={handleChatSubmit} className="mt-4 flex items-center gap-2">
                        <Input 
                            value={chatInput}
                            onChange={(e) => setChatInput(e.target.value)}
                            placeholder="Ask a question..."
                            disabled={isChatLoading}
                        />
                        <Button type="submit" size="icon" disabled={isChatLoading || !chatInput.trim()}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
