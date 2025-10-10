

'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card as ShadCard, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, Sparkle, Linkedin, Twitter, Facebook } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import FaultyTerminal from "@/components/FaultyTerminal";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import Shuffle from "@/components/Shuffle";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import dashboard_img from "../public/images/dashboard.png";
import FadeContent from '@/components/FadeContent';
import CardSwap, { Card } from '@/components/CardSwap';
import WhyChooseUs from "@/components/WhyChooseUs";
import features1 from "../public/images/Futuristic_Learning_Video_Generation.gif"
import features2 from "../public/images/Video_Ready_Link_Provided.gif"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CountUp from "@/components/CountUp";
import Orb from "@/components/Orb";

const DiamondIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    <defs>
      <linearGradient id="diamond-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'white', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: '#26CF80', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path fill="url(#diamond-gradient)" d="M12 2L2 12l10 10 10-10L12 2z" />
  </svg>
);



const DiscordIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg fill="currentColor" viewBox="0 0 127.14 96.36" {...props}><path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83,97.68,97.68,0,0,0-24.43,0,72.37,72.37,0,0,0-3.36-6.83A105.15,105.15,0,0,0,19.39,8.09,105.15,105.15,0,0,0,19.39,8.09c-18.14,10.33-31.43,33.43-36.14,56.63h0a104.82,104.82,0,0,0,10.42,16.59,96.36,96.36,0,0,0,24.43,11.9,72.37,72.37,0,0,0,3.36,6.83,104.82,104.82,0,0,0,16.58,10.41h.09a72.06,72.06,0,0,0,6.83,3.36,104.82,104.82,0,0,0,10.41,1.46,72.37,72.37,0,0,0,6.83-3.36,105.15,105.15,0,0,0,16.59-10.41,72.06,72.06,0,0,0,3.36-6.83,96.36,96.36,0,0,0,24.43-11.9,104.82,104.82,0,0,0,10.42-16.59h0C139.14,41.52,125.85,18.4,107.7,8.07ZM42.45,65.69C36.65,65.69,32,60.22,32,53.42s4.65-12.27,10.45-12.27S52.9,46.62,52.8,53.42,48.25,65.69,42.45,65.69Zm42.24,0C78.88,65.69,74.24,60.22,74.24,53.42S78.88,41.15,84.69,41.15,95.14,46.62,95,53.42,90.49,65.69,84.69,65.69Z" /></svg>
);



export default function LandingPage() {
  const dashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-preview');

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <div style={{ position: 'fixed', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%', zIndex: -1 }}>
          <FaultyTerminal
            scale={3}
            gridMul={[2, 1]}
            digitSize={1.8}
            timeScale={0.5}
            pause={false}
            scanlineIntensity={0.5}
            glitchAmount={0.5}
            flickerAmount={0.5}
            noiseAmp={1}
            chromaticAberration={0}
            dither={0}
            curvature={0.1}
            tint="#26CF80"
            mouseReact={true}
            mouseStrength={0.5}
            brightness={0.6}
          />
        </div>
        <section id="hero" className="w-full min-h-screen relative flex items-center justify-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
              <div className="flex flex-col justify-center space-y-4 z-20 text-center items-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-joystix text-white">
                  <Shuffle text="Learn anything, 10x faster" />
                </h1>
                <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto font-poppins">
                  Paste any content—YouTube links, PDFs, articles, or text—and let our AI generate your personalized study materials in seconds.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-white/20 text-white backdrop-blur-sm border border-white/20 hover:bg-white/30 transition-colors rounded-full">
                    <Link href="/signup">Start Free</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:pt-12 lg:py-32 bg-gradient-to-b from-transparent via-stone-950 to-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollFloat tag="h1" className="text-[100px] md:text-[300px] font-blackheat text-white" scrollStart="top 80%">
                  How It Works
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-[900px] mx-auto md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  It's as simple as 1, 2, 3. Paste your content, generate your materials, and start studying smarter.
                </ScrollReveal>
              </div>
            </div>
            <div className="max-w-6xl mx-auto mt-12 relative">
              <div className="browser-mockup">
                <div className="browser-header">
                  <div className="browser-dots">
                    <span className="dot" style={{ background: '#f25f58' }}></span>
                    <span className="dot" style={{ background: '#fbbe3c' }}></span>
                    <span className="dot" style={{ background: '#34c748' }}></span>
                  </div>
                  <div className="browser-address-bar">
                    siloir.app
                  </div>
                </div>
                <div className="browser-content">
                  <Image src={dashboard_img} alt="Scheduler" className="w-full rounded-lg" data-ai-hint="calendar schedule" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-12 lg:py-12 bg-black overflow-hidden">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <ScrollFloat tag="h1" className="text-[100px] md:text-[300px] font-blackheat text-white">
                Features
              </ScrollFloat>
            </div>
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white">
                  Unlock Your Learning Potential
                </h2>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-2xl mt-4 !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Siloir transforms your study materials into powerful, interactive learning tools. Discover how our features can help you master any subject.
                </ScrollReveal>
              </div>
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className="browser-mockup">
                  <Image src={features1} alt="Scheduler" width={800} height={400} className="rounded-lg" data-ai-hint="calendar schedule" />
                </div>
              </FadeContent>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <div className="browser-mockup">
                  <Image src={features2} alt="Scheduler" width={800} height={400} className="rounded-lg" data-ai-hint="calendar schedule" />
                </div>
              </FadeContent>
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white">
                  Your Personal AI Study Coach
                </h2>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="!m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Our AI chatbot acts as your personal tutor, guiding you on when to review using spaced repetition to strengthen your memory and make every study session more effective.
                </ScrollReveal>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white">
                  Everything You Need to Succeed
                </h2>
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

        <WhyChooseUs />

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black via-stone-950 to-transparent relative">
          <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollFloat tag="h1" className="text-[70px] md:text-[200px] font-blackheat text-white" scrollStart="top 80%">
                  See what our clients love
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Discover why teams trust Siloir to automate workflows, boost growth, and deliver standout experiences.
                </ScrollReveal>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <FadeContent>
                <ShadCard className="bg-card/50 backdrop-blur-sm p-6 h-full flex flex-col justify-between">
                  <blockquote className="text-lg text-white">"Siloir has been a game-changer for my exams. I used to spend hours making flashcards, but now I can generate a full study set from a lecture video in minutes. My grades have never been better."</blockquote>
                  <footer className="mt-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/alex/40/40" alt="Alex Chen" />
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">Alex Chen</p>
                      <p className="text-sm text-muted-foreground">College Student</p>
                    </div>
                  </footer>
                </ShadCard>
              </FadeContent>
              <FadeContent delay={200}>
                <ShadCard className="bg-card/50 backdrop-blur-sm p-6 h-full flex flex-col justify-between">
                  <blockquote className="text-lg text-white">"The AI quizzes are my favorite feature. They find the exact gaps in my knowledge and help me focus on what I actually need to learn. It’s like having a personal tutor."</blockquote>
                  <footer className="mt-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/priya/40/40" alt="Priya Das" />
                      <AvatarFallback>PD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">Priya Das</p>
                      <p className="text-sm text-muted-foreground">Lifelong Learner</p>
                    </div>
                  </footer>
                </ShadCard>
              </FadeContent>
              <FadeContent delay={400}>
                <ShadCard className="bg-card/50 backdrop-blur-sm p-6 h-full flex flex-col justify-between">
                  <blockquote className="text-lg text-white">"As a med student, my study time is precious. Siloir's smart scheduler tells me exactly what to review and when, so I'm always prepared. I can't imagine studying without it."</blockquote>
                  <footer className="mt-4 flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src="https://picsum.photos/seed/daniel/40/40" alt="Daniel Rivera" />
                      <AvatarFallback>DR</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-white">Daniel Rivera</p>
                      <p className="text-sm text-muted-foreground">Medical Student</p>
                    </div>
                  </footer>
                </ShadCard>
              </FadeContent>
            </div>
          </div>
        </section>

        <section id="stats" className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-transparent to-black">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <FadeContent>
                <div className="p-8 bg-card/50 backdrop-blur-sm rounded-lg">
                  <h3 className="text-5xl font-bold text-white"><CountUp to={99.99} duration={2.5} />%</h3>
                  <p className="text-muted-foreground mt-2">Always On, Always Reliable</p>
                </div>
              </FadeContent>
              <FadeContent delay={200}>
                <div className="p-8 bg-card/50 backdrop-blur-sm rounded-lg">
                  <h3 className="text-5xl font-bold text-white"><CountUp to={1} duration={2} />M+</h3>
                  <p className="text-muted-foreground mt-2">People Powered by Siloir</p>
                </div>
              </FadeContent>
              <FadeContent delay={400}>
                <div className="p-8 bg-card/50 backdrop-blur-sm rounded-lg">
                  <h3 className="text-5xl font-bold text-white"><CountUp to={24} duration={2} />/7</h3>
                  <p className="text-muted-foreground mt-2">Real Humans, Real Help</p>
                </div>
              </FadeContent>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-black">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
                  Simple, transparent pricing
                </ScrollFloat>
                <ScrollReveal
                  tag="div"
                  textTag="p"
                  className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed !m-0"
                  textClassName="!text-xl !font-normal !text-muted-foreground"
                >
                  Choose the plan that's right for you. Get started for free.
                </ScrollReveal>
              </div>
            </div>
            <div className="grid items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 mt-12 px-4 md:px-6">
              <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0} className="h-full">
                <ShadCard className="flex flex-col bg-card/50 backdrop-blur-sm h-full border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl">
                  <CardHeader className="p-6 text-left">
                    <CardTitle className="text-2xl font-bold text-white pt-2">Free</CardTitle>
                    <div className="flex items-baseline gap-1 pt-4">
                      <span className="text-5xl font-bold tracking-tighter text-white">$0</span>
                      <span className="text-sm font-medium text-muted-foreground">/ month</span>
                    </div>
                    <CardDescription className="text-muted-foreground pt-2">For casual learners to get a taste of accelerated learning.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 pt-0">
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>10 study packs per month</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Basic AI generation</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>AI Tutor</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Text to notes</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Community support</span></li>
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button asChild className="w-full group bg-white text-black hover:bg-gray-200 rounded-full" size="lg">
                      <Link href="/signup">
                        Start for Free
                        <span className="ml-2 bg-black text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
              <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0} className="h-full">
                <ShadCard className="flex flex-col shadow-lg backdrop-blur-sm h-full relative transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl bg-gradient-to-b from-green-900/40 to-black">
                  <CardHeader className="p-6 text-left">
                    <CardTitle className="text-2xl font-bold text-white pt-2 flex items-center gap-2">
                      <Sparkle className="size-6 text-primary" />
                      Pro
                    </CardTitle>
                    <div className="flex items-baseline gap-1 pt-4">
                      <span className="text-5xl font-bold tracking-tighter text-white">$15</span>
                      <span className="text-sm font-medium text-muted-foreground">/ month</span>
                    </div>
                    <CardDescription className="text-muted-foreground pt-2">For dedicated students and professionals who need to learn effectively.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 pt-0">
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Everything in Basic, plus:</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Unlimited study packs</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Advanced AI Agent</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Analytics</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Youtube to notes</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>PDF, article to notes</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Spaced repetition reviews</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Priority support</span></li>
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button asChild className="w-full group bg-white text-black hover:bg-gray-200 rounded-full" size="lg">
                      <Link href="/signup">
                        Go Pro
                        <span className="ml-2 bg-black text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
              <FadeContent blur={false} duration={1000} easing="ease-out" initialOpacity={0} className="h-full">
                <ShadCard className="flex flex-col bg-card/50 backdrop-blur-sm h-full border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 rounded-2xl">
                  <CardHeader className="p-6 text-left">
                    <CardTitle className="text-2xl font-bold text-white pt-2">Team</CardTitle>
                    <div className="flex items-baseline gap-1 pt-4">
                      <span className="text-5xl font-bold tracking-tighter text-white">$29</span>
                      <span className="text-sm font-medium text-muted-foreground">/ month</span>
                    </div>
                    <CardDescription className="text-muted-foreground pt-2">For organizations and learning groups to collaborate.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 p-6 pt-0">
                    <ul className="space-y-3 text-sm text-gray-300">
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Everything in Pro</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Team collaboration features</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Shared study sets</span></li>
                      <li className="flex items-start gap-3"><DiamondIcon className="size-5 shrink-0 mt-0.5" /> <span>Student analytics dashboard</span></li>
                    </ul>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button asChild className="w-full group bg-white text-black hover:bg-gray-200 rounded-full" size="lg">
                      <Link href="/signup">
                        Contact Sales
                        <span className="ml-2 bg-black text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                          <ArrowUpRight className="size-4" />
                        </span>
                      </Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
            </div>
          </div>
        </section>

        <section id="launch" className="w-full py-20 md:py-32 lg:py-40 bg-black text-white relative overflow-hidden">
          <div className="absolute inset-0 w-full h-full z-0">
            <Orb
              hoverIntensity={0.5}
              rotateOnHover={true}
              hue={173}
              forceHoverState={true}
            />
          </div>
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mix-blend-difference">Launch with Siloir.</h2>
              <div className="flex items-center gap-6">
                <Link href="/signup" className="text-lg font-medium inline-flex items-center gap-2 hover:text-primary transition-colors">
                  Get Started <ArrowUpRight className="size-5" />
                </Link>
                <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200 rounded-full group">
                  <Link href="/features">
                    Learn More
                    <span className="ml-2 bg-black text-white rounded-full p-1 group-hover:translate-x-1 transition-transform">
                      <ArrowUpRight className="size-4" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}



