
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Logo } from "@/components/icons";
import { useAuth, useUser, useFirestore, useMemoFirebase } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { useState, useEffect } from "react";
import { collection, getDocs, query, limit, doc, getDoc } from "firebase/firestore";
import { setDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { updateProfile, serverTimestamp } from "firebase/auth";

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
    const [isCheckingUserDoc, setIsCheckingUserDoc] = useState(false);

    useEffect(() => {
        const checkUserAndRedirect = async () => {
            if (!isUserLoading && user && firestore && !isCheckingUserDoc) {
                setIsCheckingUserDoc(true);
                try {
                    const userDocRef = doc(firestore, `users/${user.uid}`);
                    const userDocSnap = await getDoc(userDocRef);

                    if (!userDocSnap.exists()) {
                        // This is likely the user's first login after signup.
                        // Let's create their document.
                        await setDocumentNonBlocking(userDocRef, {
                            fullName: user.displayName || 'New User',
                            email: user.email,
                            createdAt: serverTimestamp(),
                        }, { merge: true });
                        router.push('/onboarding');
                    } else {
                        // User doc exists, check for study packs for redirection logic
                        const studyPacksRef = collection(firestore, `users/${user.uid}/studyPacks`);
                        const q = query(studyPacksRef, limit(1));
                        const snapshot = await getDocs(q);

                        if (snapshot.empty) {
                            router.push('/onboarding');
                        } else {
                            router.push('/dashboard');
                        }
                    }
                } catch (error) {
                    console.error("Error during user document check/creation:", error);
                    router.push('/dashboard'); 
                } finally {
                    setIsCheckingUserDoc(false);
                }
            }
        };
        checkUserAndRedirect();
    }, [user, isUserLoading, router, firestore, isCheckingUserDoc]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (auth) {
            initiateEmailSignIn(auth, email, password);
        }
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
                    Log In
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
