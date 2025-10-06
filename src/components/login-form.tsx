
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/icons";

function SocialIcon({ children }: { children: React.ReactNode }) {
    return (
        <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            {children}
        </button>
    )
}

function GoogleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15.545 6.545a9.01 9.01 0 0 0-13.09 0" />
            <path d="M15.545 6.545a9.01 9.01 0 0 1 0 10.91" />
            <path d="M3.455 17.455a9.01 9.01 0 0 0 10.91 0" />
            <path d="M3.455 17.455a9.01 9.01 0 0 1 0-10.91" />
            <path d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            <path d="M12 12v6" />
            <path d="M12 21a9 9 0 0 0 0-18" />
        </svg>
    )
}


export function LoginForm() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    }

  return (
    <div className="w-full max-w-md mx-auto">
        <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-xl opacity-20"></div>
            <Card className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white">
            <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Logo className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Welcome back to Studydio</CardTitle>
                <CardDescription className="text-white/60">
                Continue where you left off — your study world awaits.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className="bg-black/30 border-white/10" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required className="bg-black/30 border-white/10" />
                </div>
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Checkbox id="remember-me" className="border-white/20 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                        <Label htmlFor="remember-me" className="text-white/80">Remember me</Label>
                    </div>
                     <Link href="#" className="text-primary/80 hover:text-primary underline">
                        Forgot password?
                    </Link>
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
                    Log In
                </Button>
                </form>
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-white/60">or continue with</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                   <SocialIcon><GoogleIcon /></SocialIcon>
                </div>
                <div className="mt-6 text-center text-sm">
                <span className="text-white/60">New here? </span>
                <Link href="/signup" className="text-primary hover:underline">
                    Create an account
                </Link>
                </div>
            </CardContent>
            </Card>
        </div>
    </div>
  );
}
