
import { Check, Star } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ScrollFloat from "@/components/ScrollFloat";
import ScrollReveal from "@/components/ScrollReveal";
import FadeContent from "@/components/FadeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - Studydio",
  description: "Find the perfect plan for your learning needs.",
};

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      priceFrequency: "/ month",
      description: "For casual learners to get a taste of accelerated learning.",
      features: [
        "Upload 3 files per month",
        "Generate summaries and flashcards",
        "Basic quizzes",
        "Community support",
      ],
      buttonText: "Start for Free",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Pro",
      price: "$12",
      priceFrequency: "/ month",
      description:
        "For dedicated students and professionals who need to learn effectively.",
      features: [
        "Unlimited uploads",
        "AI-powered deep summaries",
        "Smart flashcards with spaced repetition",
        "Export to Anki & Notion",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro",
      buttonVariant: "default",
      popular: true,
    },
    {
      name: "Team",
      price: "$29",
      priceFrequency: "/ month",
      description:
        "For organizations and learning groups to collaborate.",
      features: [
        "Everything in Pro",
        "Team collaboration features",
        "Shared study sets",
        "Student analytics dashboard",
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline",
      popular: false,
    },
  ];

  const faqs = [
    {
      question: "Can I cancel my plan anytime?",
      answer:
        "Yes, you can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period, and you will not be charged again.",
    },
    {
      question: "Do you offer student discounts?",
      answer:
        "We believe in making learning accessible. Please contact our support team with a valid student ID, and we'll be happy to provide you with a discount code for our Pro plan.",
    },
    {
      question: "Can I upload large PDFs or long videos?",
      answer:
        "Our Pro and Team plans support large file uploads and long video processing. The Free plan has limitations on file size and video length. For specific limits, please refer to our documentation.",
    },
    {
        question: "What happens if I exceed my usage limits on the Free plan?",
        answer: "If you reach your monthly limit on the Free plan, you'll be prompted to upgrade to Pro to continue generating new study materials. Your existing study packs will always remain accessible."
    }
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-black to-stone-950 text-white">
      <main className="flex-grow">
        <section
          id="hero"
          className="w-full py-24 md:py-32 lg:py-40 text-center relative"
        >
          <div className="absolute inset-0 -z-10 h-full w-full bg-gradient-to-b from-black via-stone-950/80 to-stone-950" />
          <div className="container mx-auto px-4 md:px-6">
            <ScrollFloat
              tag="h1"
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline"
            >
              Find the Perfect Plan
            </ScrollFloat>
            <ScrollReveal
              tag="div"
              textTag="p"
              className="max-w-[700px] mx-auto mt-4 md:text-xl/relaxed !m-0"
              textClassName="!text-xl !font-normal !text-muted-foreground"
            >
              Whether you’re a student, educator, or lifelong learner — Studydio
              has a plan for you.
            </ScrollReveal>
          </div>
        </section>

        <section id="pricing-tiers" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto grid max-w-sm items-start gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
              {plans.map((plan, index) => (
                <FadeContent
                  key={plan.name}
                  delay={index * 200}
                  duration={800}
                  initialOpacity={0}
                  className="h-full"
                >
                  <Card
                    className={`flex flex-col h-full bg-card/50 backdrop-blur-sm border-white/10 transition-all duration-300 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 ${
                      plan.popular ? "border-primary/70" : ""
                    }`}
                  >
                    <CardHeader className="p-6">
                      {plan.popular && (
                        <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                          <Star className="h-4 w-4" />
                          Most Popular
                        </div>
                      )}
                      <CardTitle className="text-2xl font-bold text-white pt-2">
                        {plan.name}
                      </CardTitle>
                      <CardDescription className="text-muted-foreground">
                        {plan.description}
                      </CardDescription>
                      <div className="flex items-baseline gap-1 pt-4">
                        <span className="text-4xl font-bold tracking-tighter text-white">
                          {plan.price}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                          {plan.priceFrequency}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 p-6 pt-0">
                      <ul className="space-y-3 text-sm text-gray-300">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-3">
                            <Check className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="p-6">
                      <Button
                        asChild
                        className="w-full"
                        variant={plan.buttonVariant as any}
                      >
                        <Link href="/signup">{plan.buttonText}</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </FadeContent>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                        Frequently Asked Questions
                    </h2>
                </div>
                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                    <FadeContent key={index} delay={index * 150} duration={500} initialOpacity={0}>
                        <AccordionItem value={`item-${index+1}`} className="border-b border-white/10">
                            <AccordionTrigger className="text-lg font-medium text-white hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="pt-2 text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    </FadeContent>
                    ))}
                </Accordion>
            </div>
        </section>

        <section id="cta" className="w-full py-20 md:py-28">
            <div className="container mx-auto px-4 md:px-6">
                <FadeContent duration={1000} initialOpacity={0}>
                    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gray-900/50 p-12 text-center shadow-2xl shadow-primary/10">
                         <div className="absolute inset-0 -z-10 h-full w-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
                        <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                            Start your learning journey today.
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
                            Generate your first study set in seconds. No credit card required.
                        </p>
                        <div className="mt-8">
                            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 transition-transform hover:scale-105">
                                <Link href="/signup">Get Started — It’s Free</Link>
                            </Button>
                        </div>
                    </div>
                </FadeContent>
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
