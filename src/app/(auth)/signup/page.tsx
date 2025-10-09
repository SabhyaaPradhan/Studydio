import { SignupForm } from "@/components/signup-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Siloir",
  description: "Create a new account on Siloir.",
};


export default function SignupPage() {
    return <SignupForm />;
}
