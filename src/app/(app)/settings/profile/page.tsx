
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile, isLoading } = useDoc<{ fullName: string, email: string }>(userProfileRef);

  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || '');
    }
  }, [userProfile]);

  const handleSaveChanges = () => {
    if (!userProfileRef) return;
    updateDocumentNonBlocking(userProfileRef, { fullName });
    toast({
      title: "Profile Updated",
      description: "Your changes have been saved.",
    });
  }
  
  if (isLoading) {
      return (
          <div className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-32" />
          </div>
      )
  }

  return (
    <div className="space-y-6">
        <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} />
        </div>
        <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={userProfile?.email || ''} disabled />
        </div>
        <Button onClick={handleSaveChanges} disabled={isLoading}>Save Changes</Button>
    </div>
  );
}
