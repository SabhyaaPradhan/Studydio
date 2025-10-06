

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card as ShadCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Wand2, Bot, FileText, BookOpen, Clock, Brain, BarChart, Link as LinkIcon } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import FaultyTerminal from "@/components/FaultyTerminal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import FadeContent from '@/components/FadeContent';
import GradualBlur from "@/components/GradualBlur";
import CardSwap, { Card } from '@/components/CardSwap';
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features - Studydio",
    description: "Explore the tools that help you understand, not just memorize.",
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <main className="relative flex-grow">
        
        <section id="hero" className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-transparent via-stone-950/80 to-black text-center">
          <div className="container mx-auto px-4 md:px-6">
            <ScrollFloat tag="h1" className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
              Built to make learning effortless.
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

        <section id="interactive-demo" className="w-full py-12 md:py-24 lg:py-32 bg-black">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-12">
                     <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                        See Studydio in Action
                    </ScrollFloat>
                    <ScrollReveal
                        tag="div"
                        textTag="p"
                        className="max-w-2xl mx-auto mt-4 !m-0"
                        textClassName="!text-xl !font-normal !text-muted-foreground"
                    >
                        From raw content to a full study suite. It’s that simple.
                    </ScrollReveal>
                </div>
                <div className="grid md:grid-cols-1 gap-12 items-center max-w-2xl mx-auto">
                    <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                        <ShadCard className="bg-card/50 backdrop-blur-md border-white/10 p-8">
                            <h3 className="text-2xl font-bold mb-4">1. Provide Your Content</h3>
                            <p className="text-muted-foreground mb-6">Just paste a link to a YouTube video, a web article, or upload a PDF document.</p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 bg-black/30 p-4 rounded-lg">
                                    <LinkIcon size={24} className="text-primary" />
                                    <p className="font-mono text-sm text-white/80 truncate">https://www.youtube.com/watch?v=...</p>
                                </div>
                                <div className="flex items-center gap-4 bg-black/30 p-4 rounded-lg">
                                    <FileText size={24} className="text-primary" />
                                    <p className="font-mono text-sm text-white/80 truncate">quantum_physics_101.pdf</p>
                                </div>
                            </div>
                        </ShadCard>
                    </FadeContent>
                </div>
            </div>
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
