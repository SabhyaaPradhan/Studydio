
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useUser } from "@/firebase";
import ScrollFloat from "@/components/ScrollFloat";
import { Metadata } from "next";

export default function SettingsPage() {
  const { user } = useUser();
  return (
    <div className="container mx-auto space-y-8">
      <div>
        <ScrollFloat tag="h1" className="text-3xl font-bold" textClassName="scroll-float-text-h1">Settings</ScrollFloat>
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
            <Input id="name" defaultValue={user?.displayName || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={user?.email || ""} />
          </div>
          <Button>Save Changes</Button>
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
