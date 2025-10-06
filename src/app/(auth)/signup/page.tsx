import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Studydio",
  description: "Create a new account on Studydio.",
};


export default function SignupPage() {
    return <SignupForm />;
}
