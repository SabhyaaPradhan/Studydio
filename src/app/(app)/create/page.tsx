
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Wand2, Upload, Link as LinkIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import { generateStudyPackFromContent } from "@/ai/flows/generate-study-pack-from-content";
import { useToast } from "@/hooks/use-toast";


export default function CreateNewPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [pastedText, setPastedText] = useState("");
    const [linkUrl, setLinkUrl] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [activeTab, setActiveTab] = useState("paste");
    const router = useRouter();
    const { toast } = useToast();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const getContent = async () => {
        switch (activeTab) {
            case 'paste':
                return pastedText;
            case 'link':
                const response = await fetch('/api/fetch-url', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: linkUrl }),
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch content from URL.');
                }
                const { content } = await response.json();
                return content;
            case 'upload':
                if (!file) throw new Error("No file selected.");
                const formData = new FormData();
                formData.append('file', file);
                const uploadResponse = await fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                });

                if (!uploadResponse.ok) {
                    throw new Error('Failed to upload or process file.');
                }
                const { content: fileContent } = await uploadResponse.json();
                return fileContent;
            default:
                return '';
        }
    }


    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        
        let contentToGenerate = '';
        try {
             contentToGenerate = await getContent();
        } catch(error: any) {
             toast({
                variant: "destructive",
                title: "Error fetching content",
                description: error.message || "Could not retrieve content.",
            });
            return;
        }

        if (!contentToGenerate.trim()) {
            toast({
                variant: "destructive",
                title: "Content is empty",
                description: "Please provide some content to generate a study pack.",
            });
            return;
        }
        setIsLoading(true);
        try {
            const result = await generateStudyPackFromContent({ content: contentToGenerate });

            if (!result || !result.title || !result.flashcards || !result.quiz || !result.summary) {
                 throw new Error("AI response is missing required fields.");
            }
            
            const newPackId = `new-pack-${Date.now()}`;
            const newPack = {
                id: newPackId,
                title: result.title,
                contentType: activeTab === 'paste' ? 'text' : activeTab,
                contentSnippet: contentToGenerate.substring(0, 100) + '...',
                progress: 0,
                createdAt: new Date().toISOString(),
                flashcards: result.flashcards.map((fc, i) => ({ id: `fc-${newPackId}-${i}`, ...fc })),
                quiz: result.quiz.quiz.map((q, i) => ({ id: `q-${newPackId}-${i}`, ...q })),
                summary: result.summary,
            };
            
            const existingPacks = JSON.parse(localStorage.getItem('userStudyPacks') || '[]');
            localStorage.setItem('userStudyPacks', JSON.stringify([newPack, ...existingPacks]));
            localStorage.setItem('newStudyPack', JSON.stringify(newPack));


            router.push(`/study/${newPackId}`);
        } catch (error) {
            console.error("Failed to generate study pack:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "There was an error generating the study pack. The AI might have returned an invalid response. Please try again.",
            });
        } finally {
            setIsLoading(false);
        }
    }

  return (
    <div className="container mx-auto max-w-3xl">
      <Card className="shadow-lg">
        <CardHeader>
          <ScrollFloat tag={CardTitle} className="text-3xl font-bold" textClassName="scroll-float-text-h1">Create a New Study Pack</ScrollFloat>
          <ScrollReveal tag={CardDescription} className="!m-0" textClassName="!text-sm !font-normal">Paste content, a link, or upload a file to get started.</ScrollReveal>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleGenerate}>
                <Tabs defaultValue="paste" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="paste"><Wand2 className="mr-2 h-4 w-4" />Paste Text</TabsTrigger>
                        <TabsTrigger value="link"><LinkIcon className="mr-2 h-4 w-4" />From Link</TabsTrigger>
                        <TabsTrigger value="upload"><Upload className="mr-2 h-4 w-4" />Upload</TabsTrigger>
                    </TabsList>
                    <TabsContent value="paste" className="mt-4">
                        <Textarea
                            placeholder="Paste your article, notes, or any text here..."
                            className="min-h-[250px] text-base"
                            value={pastedText}
                            onChange={(e) => setPastedText(e.target.value)}
                        />
                    </TabsContent>
                    <TabsContent value="link" className="mt-4">
                         <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="link">YouTube, Article, or PDF Link</Label>
                            <Input id="link" type="url" placeholder="https://..." value={linkUrl} onChange={e => setLinkUrl(e.target.value)} />
                        </div>
                    </TabsContent>
                    <TabsContent value="upload" className="mt-4">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="picture">Upload PDF</Label>
                            <Input id="picture" type="file" accept=".pdf" onChange={handleFileChange} />
                        </div>
                    </TabsContent>
                </Tabs>
                
                <div className="mt-6">
                    <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Generating...
                            </>
                        ) : (
                            <>
                                <Wand2 className="mr-2 h-5 w-5" />
                                Generate Study Pack
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </CardContent>
      </Card>
    </div>
  );
}

    