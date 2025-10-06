
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";

function SocialIcon({ children }: { children: React.ReactNode }) {
    return (
        <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" suppressHydrationWarning>
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

export function SignupForm() {
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push('/dashboard');
    }

  return (
     <div className="w-full max-w-md mx-auto">
        <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full blur-xl opacity-20"></div>
            <Card className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white">
            <CardHeader className="text-center">
                 <div className="flex justify-center mb-4">
                    <Logo className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-2xl font-bold">Join Studydio for Free</CardTitle>
                <CardDescription className="text-white/60">
                Turn your content into smart study tools instantly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="full-name">Full name</Label>
                    <Input id="full-name" placeholder="Alex Doe" required className="bg-black/30 border-white/10" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className="bg-black/30 border-white/10" />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required className="bg-black/30 border-white/10" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg">
                    Create Account
                </Button>
                </form>
                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-white/60">or continue with</span>
                    </div>
                </div>
                <div className="flex justify-center gap-4">
                   <SocialIcon><GoogleIcon /></SocialIcon>
                </div>
                <div className="mt-6 text-center text-sm">
                <span className="text-white/60">Already have an account? </span>
                <Link href="/login" className="text-primary hover:underline">
                    Log in
                </Link>
                </div>
            </CardContent>
            </Card>
        </div>
    </div>
  );
}
