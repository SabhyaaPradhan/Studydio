
'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';
import { setDocumentNonBlocking } from './non-blocking-updates';
import { doc, serverTimestamp } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';


/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): void {
  signInAnonymously(authInstance).catch(error => {
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description: 'Could not sign in anonymously. Please try again.',
    });
  });
}

/** Initiate email/password sign-up (non-blocking). */
export async function initiateEmailSignUp(authInstance: Auth, email: string, password: string, fullName: string): Promise<void> {
  try {
    const userCredential = await createUserWithEmailAndPassword(authInstance, email, password);
    
    // Update profile display name
    await updateProfile(userCredential.user, { displayName: fullName });

    // After profile is updated, create user document in Firestore
    const firestore = getFirestore(authInstance.app);
    const userDocRef = doc(firestore, "users", userCredential.user.uid);
    
    // Using setDocumentNonBlocking as per existing patterns
    setDocumentNonBlocking(userDocRef, {
        fullName: fullName,
        email: userCredential.user.email,
        createdAt: serverTimestamp(),
    }, { merge: true });

    // After everything, sign the user out so they have to log in.
    await authInstance.signOut();

  } catch (error: any) {
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
    // Re-throw the error so the calling component knows the signup failed
    throw error;
  }
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
