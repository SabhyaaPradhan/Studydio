

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
import dashboard_img from "../public/images/dashboard.png";
import FadeContent from '@/components/FadeContent';
import GradualBlur from "@/components/GradualBlur";
import CardSwap, { Card } from '@/components/CardSwap';
import WhyChooseUs from "@/components/WhyChooseUs";
import features1 from "../public/images/Futuristic_Learning_Video_Generation.gif"
import features2 from "../public/images/Video_Ready_Link_Provided.gif"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function LandingPage() {
  const dashboardImage = PlaceHolderImages.find(p => p.id === 'dashboard-preview');

  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="relative">
        <div style={{ position: 'fixed', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%', zIndex: -1 }}>
          <FaultyTerminal
            scale={0.5}
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
                        <video
                            className="w-full h-full object-cover"
                            src="/videos/Futuristic_Learning_Video_Generation.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
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
                       <video
                            className="w-full h-full object-cover"
                            src="/videos/Futuristic_Learning_Video_Generation.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
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
                  className="max-w-2xl mt-4 !m-0"
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

        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32 bg-black relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <ScrollFloat tag="h2" className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline text-white" textClassName="scroll-float-text-h2">
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

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-transparent">
          <div className="container mx-auto px-4 md:px-6">
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
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <ShadCard className="flex flex-col bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle>Free</CardTitle>
                    <CardDescription>For casual learners to get a taste of accelerated learning.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-4xl font-bold">$0<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> 3 study packs per month</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Basic AI generation</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Community support</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/signup">Get Started</Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <ShadCard className="flex flex-col border-primary shadow-lg bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For dedicated students and professionals who need to learn effectively.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-4xl font-bold">$10<span className="text-sm font-normal text-muted-foreground">/month</span></div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Unlimited study packs</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Advanced AI generation</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Spaced repetition reviews</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Priority support</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href="/signup">Go Pro</Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
              <FadeContent blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
                <ShadCard className="flex flex-col bg-card/50 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle>Team</CardTitle>
                    <CardDescription>For organizations and learning groups to collaborate.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="text-4xl font-bold">Contact Us</div>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Everything in Pro, plus:</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Team collaboration features</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Centralized billing</li>
                      <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Dedicated account manager</li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link href="/contact">Contact Sales</Link>
                    </Button>
                  </CardFooter>
                </ShadCard>
              </FadeContent>
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10">
        <p className="text-xs text-muted-foreground">&copy; 2024 Siloir. All rights reserved.</p>
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

    

    



