
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { updateDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";


export default function SettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

  const userProfileRef = useMemoFirebase(() => {
    if (!user) return null;
    return doc(firestore, `users/${user.uid}`);
  }, [firestore, user]);

  const { data: userProfile, isLoading } = useDoc<{ fullName: string, email: string }>(userProfileRef);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile.fullName || '');
      setEmail(userProfile.email || '');
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

  return (
    <div className="container mx-auto space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings, plan, and notifications.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Update your personal information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={isLoading} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} disabled />
          </div>
          <Button onClick={handleSaveChanges} disabled={isLoading}>Save Changes</Button>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>My Plan</CardTitle>
          <CardDescription>You are currently on the <span className="font-semibold text-primary">Pro</span> plan.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">Your plan renews on August 23, 2024.</p>
          <Button>Manage Subscription</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Manage how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="review-reminders" className="font-medium">Daily Review Reminders</Label>
              <p className="text-sm text-muted-foreground">Receive an email when you have cards to review.</p>
            </div>
            <Switch id="review-reminders" defaultChecked />
          </div>
           <div className="flex items-center justify-between rounded-lg border p-4">
            <div>
              <Label htmlFor="product-updates" className="font-medium">Product Updates</Label>
              <p className="text-sm text-muted-foreground">Get notified about new features and updates.</p>
            </div>
            <Switch id="product-updates" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
