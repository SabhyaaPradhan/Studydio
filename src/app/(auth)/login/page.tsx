import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Studydio",
  description: "Login to your Studydio account.",
};


export default function LoginPage() {
  return <LoginForm />;
}
