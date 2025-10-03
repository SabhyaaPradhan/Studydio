
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import LandingHeader from "@/components/landing-header";
import FaultyTerminal from "@/components/FaultyTerminal";
import Shuffle from "@/components/Shuffle";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">
        <section id="hero" className="w-full min-h-screen relative flex items-center justify-center">
          <div style={{position: 'absolute', top: 0, left: 0, overflow: 'hidden', width: '100%', height: '100%', zIndex: 0}}>
            <FaultyTerminal
              scale={1.5}
              gridMul={[2, 1]}
              digitSize={1.2}
              timeScale={0.5}
              pause={false}
              scanlineIntensity={0.5}
              glitchAmount={1}
              flickerAmount={1}
              noiseAmp={1}
              chromaticAberration={0}
              dither={0}
              curvature={0.1}
              tint="#26CF80"
              mouseReact={true}
              mouseStrength={0.5}
              pageLoadAnimation={true}
              brightness={0.6}
            />
          </div>
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1 lg:gap-12 xl:grid-cols-1">
              <div className="flex flex-col justify-center space-y-4 z-20 text-center items-center">
                <div className="space-y-2">
                  <Shuffle
                    text="Learn anything, 10x faster"
                    shuffleDirection="right"
                    duration={0.7}
                    animationMode="evenodd"
                    shuffleTimes={2}
                    ease="power3.out"
                    stagger={0.03}
                    threshold={0.1}
                    triggerOnce={false}
                    triggerOnHover={true}
                    respectReducedMotion={true}
                    className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-joystix text-white"
                    tag="h1"
                  />
                  <p className="max-w-[600px] text-gray-200 md:text-xl mx-auto">
                    Paste any content—YouTube links, PDFs, articles, or text—and let our AI generate your personalized study materials in seconds.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="bg-white/80 text-black backdrop-blur-sm border border-white/20 hover:bg-white transition-colors rounded-full">
                    <Link href="/signup">Start Free</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Simple, transparent pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you. Get started for free.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3 mt-12">
              <Card className="flex flex-col">
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
              </Card>
              <Card className="flex flex-col border-primary shadow-lg">
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
              </Card>
              <Card className="flex flex-col">
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
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
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
