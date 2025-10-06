'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  // Assume getAuth and app are initialized elsewhere
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  // CRITICAL: Call signInAnonymously directly. Do NOT use 'await signInAnonymously(...)'.
  signInAnonymously(authInstance).catch(error => {
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description: 'Could not sign in anonymously. Please try again.',
    });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call createUserWithEmailAndPassword directly. Do NOT use 'await createUserWithEmailAndPassword(...)'.
  createUserWithEmailAndPassword(authInstance, email, password).catch(error => {
    let description = 'An unexpected error occurred. Please try again.';
    if (error.code === 'auth/email-already-in-use') {
      description = 'This email address is already in use by another account.';
    } else if (error.code === 'auth/weak-password') {
      description = 'The password is too weak. Please use a stronger password.';
    }
    toast({
      variant: 'destructive',
      title: 'Signup Failed',
      description: description,
    });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): void {
  // CRITICAL: Call signInWithEmailAndPassword directly. Do NOT use 'await signInWithEmailAndPassword(...)'.
  signInWithEmailAndPassword(authInstance, email, password).catch(error => {
    toast({
      variant: 'destructive',
      title: 'Login Failed',
      description: 'Invalid email or password. Please try again.',
    });
  });
  // Code continues immediately. Auth state change is handled by onAuthStateChanged listener.
}
