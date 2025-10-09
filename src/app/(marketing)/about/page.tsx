
'use client';

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Zap, Heart, CheckCircle, Globe } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import FadeContent from "@/components/FadeContent";
import { useInView } from "react-intersection-observer";
import { Metadata } from "next";

// This is a client component, so we can't export metadata directly.
// We'd set this in a parent layout or using a different strategy if needed.
// export const metadata: Metadata = {
//   title: "About Us - Siloir",
//   description: "Learn about our mission to make learning effortless and accessible for everyone.",
// };

const StaticNumber = ({ n }) => {
    return <div>{Math.floor(n).toLocaleString()}</div>;
};

export default function AboutPage() {
    const { ref: statsRef, inView: statsInView } = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black via-stone-900 to-stone-950 text-white">
      <main className="flex-grow">
        <section
          id="hero"
          className="w-full py-32 md:py-48 lg:py-56 text-center relative"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-stone-950/80 to-stone-950" />
          <div className="container mx-auto px-4 md:px-6">
            <ScrollFloat
              tag="h1"
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline"
            >
              Our mission is to make learning effortless.
            </ScrollFloat>
            <ScrollReveal
              tag="div"
              textTag="p"
              className="max-w-[700px] mx-auto mt-6 md:text-xl/relaxed !m-0"
              textClassName="!text-lg !font-normal !text-muted-foreground"
            >
              Siloir was built to help students and creators learn faster, understand deeper, and make studying smarter — not harder.
            </ScrollReveal>
             <div className="mt-8">
                <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                    <Link href="/signup">Start Learning with Siloir</Link>
                </Button>
            </div>
          </div>
        </section>

        <section id="the-story" className="w-full py-16 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <FadeContent>
                        <Image
                            src="https://picsum.photos/seed/about-story/800/600"
                            alt="Siloir UI Mockup"
                            width={800}
                            height={600}
                            className="rounded-xl shadow-2xl shadow-primary/10"
                            data-ai-hint="abstract ui"
                        />
                    </FadeContent>
                    <FadeContent delay={200}>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">It started as a simple idea.</h2>
                            <p className="text-muted-foreground md:text-lg">
                                Turning scattered content into focused learning. Today, Siloir helps thousands of learners transform videos, PDFs, and articles into powerful study material — instantly. We believe that education should be accessible and that technology can bridge the gap between information and understanding.
                            </p>
                        </div>
                    </FadeContent>
                </div>
            </div>
        </section>

        <section id="core-values" className="w-full py-16 md:py-24 lg:py-32 bg-black/20">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-12">What Drives Us</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                        { icon: <Heart className="size-8 text-primary" />, title: "Simplicity", description: "Learning tools should feel natural and intuitive." },
                        { icon: <Zap className="size-8 text-primary" />, title: "Speed", description: "Convert content into study material in seconds, not hours." },
                        { icon: <CheckCircle className="size-8 text-primary" />, title: "Clarity", description: "Understand deeply, don't just memorize." },
                        { icon: <Globe className="size-8 text-primary" />, title: "Accessibility", description: "Knowledge for everyone, everywhere." },
                    ].map((value, index) => (
                         <FadeContent key={value.title} delay={index * 150}>
                            <Card className="bg-card/50 backdrop-blur-sm border-white/10 h-full p-6 text-left transition-all duration-300 hover:border-primary/50 hover:-translate-y-2">
                                <div className="mb-4">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </Card>
                        </FadeContent>
                    ))}
                </div>
            </div>
        </section>

        <section id="impact" className="w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-black to-stone-950">
            <div ref={statsRef} className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                     {[
                        { value: 20000, label: "Study Sets Generated", suffix: "+" },
                        { value: 150, label: "Countries Reached", suffix: "+" },
                        { value: 99.9, label: "Uptime", suffix: "%" },
                        { value: 2000000, label: "Minutes Processed", suffix: "+" },
                    ].map((stat, index) => (
                        <FadeContent key={stat.label} delay={index * 150}>
                            <div className="p-6 rounded-lg">
                                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary flex items-center justify-center">
                                    {statsInView ? <StaticNumber n={stat.value} /> : '0'}
                                    <span>{stat.suffix}</span>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">{stat.label}</p>
                            </div>
                        </FadeContent>
                    ))}
                </div>
            </div>
        </section>

        <section id="cta" className="w-full py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                    Join the movement to study smarter.
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                    Your first study set takes less than a minute.
                </p>
                <div className="mt-8">
                    <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                        <Link href="/signup">Get Started — It’s Free</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>

       <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/10 bg-black">
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
