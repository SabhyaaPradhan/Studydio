
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/icons";
import { useAuth, useUser, useFirestore } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";

function SocialIcon({ children }: { children: React.ReactNode }) {
    return (
        <button className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors" suppressHydrationWarning>
            {children}
        </button>
    )
}

export function LoginForm() {
    const router = useRouter();
    const auth = useAuth();
    const firestore = useFirestore();
    const { user, isUserLoading } = useUser();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            if (user && firestore && !isUserLoading) {
                // Check if user has any study packs
                const studyPacksRef = collection(firestore, `users/${user.uid}/studyPacks`);
                const q = query(studyPacksRef, limit(1));
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    // New user or user with no packs, go to onboarding
                    router.push('/onboarding');
                } else {
                    // Existing user with packs, go to dashboard
                    router.push('/dashboard');
                }
            } else if (!isUserLoading) {
                setIsChecking(false);
            }
        };
        checkUserAndRedirect();
    }, [user, firestore, isUserLoading, router]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (auth) {
            initiateEmailSignIn(auth, email, password);
        }
    }

  if (isChecking) {
    return (
        <div className="w-full max-w-md mx-auto">
            <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full blur-xl opacity-20"></div>
                <Card className="relative bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl text-white">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold">Checking Session...</CardTitle>
                    <CardDescription className="text-white/60">
                        Please wait while we log you in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center p-8">
                        <svg className="animate-spin h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    </div>
                </CardContent>
                </Card>
            </div>
        </div>
    );
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
                <CardTitle className="text-2xl font-bold">Welcome back to Siloir</CardTitle>
                <CardDescription className="text-white/60">
                Continue where you left off — your study world awaits.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="m@example.com" required className="bg-black/30 border-white/10" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" required className="bg-black/30 border-white/10" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <Button type="submit" className="w-full bg-gradient-to-r from-cyan-400 to-blue-600 hover:opacity-90 transition-opacity text-white font-bold shadow-lg" suppressHydrationWarning>
                    {isUserLoading ? 'Logging In...' : 'Log In'}
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
                   <SocialIcon>
                        <img src="https://www.google.com/images/hpp/ic_wahlberg_product_core_48.png8.png" alt="Google logo" width="24" height="24" />
                   </SocialIcon>
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
