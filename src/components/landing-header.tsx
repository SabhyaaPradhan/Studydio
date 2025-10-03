import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons";

export default function LandingHeader() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/95 backdrop-blur-sm sticky top-0 z-50 border-b">
      <Link className="flex items-center justify-center gap-2" href="/">
        <Logo className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg">LearnFast</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Button asChild variant="ghost">
            <Link href="/login">Login</Link>
        </Button>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/signup">Sign Up</Link>
        </Button>
      </nav>
    </header>
  );
}
