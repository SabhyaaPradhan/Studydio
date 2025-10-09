

'use client';

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card as ShadCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Bot, FileText, BookOpen, Brain, BarChart, Link as LinkIcon, CheckCircle, XCircle, Loader } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import FadeContent from '@/components/FadeContent';
import { generateStudyPackFromContent, type GenerateStudyPackOutput } from "@/ai/flows/generate-study-pack-from-content";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function FeaturesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("In quantum mechanics, particles like electrons can exist in multiple states at once, a phenomenon called superposition. When measured, they collapse into a single state. This is different from classical physics, where an object is always in one definite state.");
  const [output, setOutput] = useState<GenerateStudyPackOutput | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      toast({
        variant: "destructive",
        title: "Content is empty",
        description: "Please paste some text to generate a study pack.",
      });
      return;
    }

    setIsLoading(true);
    setOutput(null);

    try {
      const result = await generateStudyPackFromContent({ content: inputText });
      setOutput(result);

    } catch (error) {
      console.error("Failed to generate study pack:", error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "There was an error generating the study pack. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="relative flex-grow">
        
        <section id="hero" className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-transparent via-stone-950/80 to-black text-center">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollFloat tag="h1" className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Built to make learning effortless
            </ScrollFloat>
             <ScrollReveal
                tag="div"
                textTag="p"
                className="max-w-[700px] mx-auto mt-4 md:text-xl/relaxed !m-0"
                textClassName="!text-xl !font-normal !text-muted-foreground"
              >
                Explore the tools that help you understand, not just memorize.
              </ScrollReveal>
          </div>
        </section>

        <section id="feature-grid" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="container mx-auto px-4 md:px-6">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><Wand2 className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">Instant Generation</h3>
                        <p className="text-muted-foreground">Paste a YouTube link, upload a PDF, or drop in text. Get a complete study set in seconds.</p>
                    </ShadCard>
                </FadeContent>
                 <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><BookOpen className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">AI-Powered Flashcards</h3>
                        <p className="text-muted-foreground">Go beyond simple terms. Our AI creates flashcards that help you grasp complex concepts.</p>
                    </ShadCard>
                </FadeContent>
                 <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><Bot className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">Adaptive Quizzes</h3>
                        <p className="text-muted-foreground">Test your knowledge with auto-generated quizzes that adapt to your learning progress.</p>
                    </ShadCard>
                </FadeContent>
                 <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><FileText className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">Concise Summaries</h3>
                        <p className="text-muted-foreground">Get the key takeaways from long articles and videos, summarized by AI for quick revision.</p>
                    </ShadCard>
                </FadeContent>
                 <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={200}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><Brain className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">Smart Review</h3>
                        <p className="text-muted-foreground">Our smart scheduler uses spaced repetition to tell you what to review and when.</p>
                    </ShadCard>
                </FadeContent>
                 <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0} delay={400}>
                    <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-6 h-full flex flex-col hover:border-primary/50 transition-colors duration-300">
                        <div className="mb-4"><BarChart className="size-8 text-primary" /></div>
                        <h3 className="text-xl font-bold mb-2">Progress Tracking</h3>
                        <p className="text-muted-foreground">Visually track your mastery over subjects and identify areas for improvement.</p>
                    </ShadCard>
                </FadeContent>
             </div>
          </div>
        </section>

        <section id="demo" className="relative py-32 bg-gradient-to-b from-stone-950 to-black text-white">
            <div className="max-w-6xl mx-auto px-6 text-center">
                <h2 className="text-5xl font-bold mb-4">See <span className="text-primary">Studydio</span> in Action</h2>
                <p className="text-gray-400 mb-10 text-lg">From raw content to a full study suite. It’s that simple.</p>

                <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md p-6 rounded-2xl">
                <label className="block text-sm text-gray-400 mb-2 text-left">Paste any text content</label>
                
                <textarea
                    placeholder="In quantum mechanics, particles like electrons can exist in multiple states at once..."
                    className="w-full p-3 h-32 rounded-xl bg-black/30 border border-white/10 focus:outline-none focus:border-white/20 text-white placeholder-gray-500 mb-4"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />

                <div className="flex items-center justify-end mb-6">
                    <Button onClick={handleGenerate} disabled={isLoading} className="px-5 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all">
                        {isLoading ? (
                            <>
                                <Loader className="mr-2 h-4 w-4 animate-spin" />
                                Generating...
                            </>
                        ) : (
                           <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Study Set
                           </>
                        )}
                    </Button>
                </div>

                {/* Result Mock */}
                {output && (
                    <div className="text-left space-y-4 animate-fadeIn">
                        {output.summary && (
                            <>
                                <p className="font-semibold text-lg">✨ Summary:</p>
                                <p className="text-gray-300">{output.summary}</p>
                            </>
                        )}
                        
                        {output.flashcards && output.flashcards.length > 0 && (
                             <>
                                <p className="font-semibold text-lg">🃏 Flashcards:</p>
                                <div className="flex flex-wrap gap-3">
                                {output.flashcards.slice(0, 2).map((fc, index) => (
                                    <div key={index} className="p-3 bg-white/10 rounded-lg">{fc.front} / {fc.back}</div>
                                ))}
                                </div>
                            </>
                        )}

                        {output.quiz && output.quiz.quiz.length > 0 && (
                            <>
                                <p className="font-semibold text-lg">🧠 Quiz Preview:</p>
                                <ul className="list-disc ml-5 text-gray-300">
                                {output.quiz.quiz.slice(0, 1).map((quizItem, index) => (
                                    <li key={index}>{quizItem.question}</li>
                                ))}
                                </ul>
                            </>
                        )}
                    </div>
                )}
                </div>
            </div>
            <style jsx>{`
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>

        <section id="cta" className="w-full py-20 md:py-28 lg:py-32 bg-gradient-to-t from-black via-stone-950 to-stone-950/80">
            <div className="container mx-auto px-4 md:px-6 text-center">
                 <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                    Ready to study smarter?
                </ScrollFloat>
                 <ScrollReveal
                    tag="div"
                    textTag="p"
                    className="max-w-xl mx-auto mt-4 !m-0"
                    textClassName="!text-lg !font-normal !text-muted-foreground"
                >
                    Start generating your first study set in seconds. No credit card required.
                </ScrollReveal>
                <div className="mt-8">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                        <Link href="/signup">Get Started for Free</Link>
                    </Button>
                </div>
            </div>
        </section>

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 bg-black">
        <p className="text-xs text-muted-foreground">&copy; 2024 Studydio. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
