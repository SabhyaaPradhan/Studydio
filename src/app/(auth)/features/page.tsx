

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card as ShadCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import FaultyTerminal from "@/components/FaultyTerminal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Shuffle from "@/components/Shuffle";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import dashboard_img from "../../../public/images/dashboard.png";
import FadeContent from '@/components/FadeContent';
import GradualBlur from "@/components/GradualBlur";
import CardSwap, { Card } from '@/components/CardSwap';
import WhyChooseUs from "@/components/WhyChooseUs";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Features - Studydio",
    description: "Explore the powerful features of Studydio that help you learn faster and smarter.",
};

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-black">
      <main className="relative">
        <div style={{ position: 'fixed', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%', zIndex: -1 }}>
          <FaultyTerminal
            scale={1.0}
            gridMul={[2, 1]}
            digitSize={2.3}
            timeScale={0.6}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={0.5}
            flickerAmount={0.5}
            noiseAmp={0.6}
            chromaticAberration={0}
            dither={0}
            curvature={0.12}
            tint="#26CF80"
            mouseReact={true}
            pageLoadAnimation={true}
            brightness={1}
            mouseStrength={0}
          />
        </div>
        
        <section id="features" className="w-full py-24 md:py-32 lg:py-40 bg-gradient-to-b from-transparent via-stone-950 to-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <ScrollFloat tag="h1" className="text-[100px] md:text-[300px] font-blackheat text-white">
                Features
              </ScrollFloat>
               <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-[900px] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Studydio is packed with AI-powered tools designed to accelerate your learning and boost retention.
                </ScrollReveal>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                  Unlock Your Learning Potential
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-2xl mt-4 !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Studydio transforms your study materials into powerful, interactive learning tools. Discover how our features can help you master any subject.
                </ScrollReveal>
              </div>
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <Image src="https://picsum.photos/seed/features/600/400" alt="Features" width={600} height={400} className="rounded-lg" data-ai-hint="learning process" />
              </FadeContent>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <Image src="https://picsum.photos/seed/scheduler/600/400" alt="Scheduler" width={600} height={400} className="rounded-lg" data-ai-hint="calendar schedule" />
              </FadeContent>
              <div>
                <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                  Study Smarter, Not Harder
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-2xl mt-4 !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Our AI-powered smart scheduler uses spaced repetition to tell you exactly when to review, reinforcing memory and making your study sessions more effective.
                </ScrollReveal>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                  Everything You Need to Succeed
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="!m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Our AI-powered tools are designed to help you learn faster and more effectively. From interactive flashcards that reinforce memory to auto-generated quizzes that test your knowledge, we provide a comprehensive suite of study materials tailored to your specific content. Get concise summaries of long articles to grasp key concepts in minutes.
                </ScrollReveal>
              </div>
              <div className="relative h-[200px] md:h-[600px]">
                <CardSwap
                  cardDistance={60}
                  verticalDistance={70}
                  delay={5000}
                  pauseOnHover={false}
                >
                  <Card className="p-6 bg-card/50 backdrop-blur-sm text-white">
                    <h3 className="text-2xl font-bold mb-4">Flashcards</h3>
                    <p className="mt-4">Generate interactive flashcards from any content.</p>
                    <Image src="https://picsum.photos/seed/flashcard/400/200" alt="Flashcards" width={400} height={200} className="rounded-lg mt-4" data-ai-hint="flashcard illustration" />
                  </Card>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm text-white">
                    <h3 className="text-2xl font-bold mb-4">Quizzes</h3>
                    <p className="mt-4">Test your knowledge with auto-generated quizzes.</p>
                    <Image src="https://picsum.photos/seed/quiz/400/200" alt="Quizzes" width={400} height={200} className="rounded-lg mt-4" data-ai-hint="quiz illustration" />
                  </Card>
                  <Card className="p-6 bg-card/50 backdrop-blur-sm text-white">
                    <h3 className="text-2xl font-bold mb-4">Summaries</h3>
                    <p className="mt-4">Get concise AI-powered summaries of long articles.</p>
                    <Image src="https://picsum.photos/seed/summary/400/200" alt="Summaries" width={400} height={200} className="rounded-lg mt-4" data-ai-hint="summary document" />
                  </Card>
                </CardSwap>
              </div>
            </div>
          </div>
        </section>
        
        <GradualBlur
          target="page"
          position="bottom"
          height="6rem"
          strength={3}
          divCount={5}
          curve="bezier"
          exponential={true}
          opacity={0.8}
        />
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
