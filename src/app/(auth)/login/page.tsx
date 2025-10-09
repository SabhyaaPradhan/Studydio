import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Siloir",
  description: "Login to your Siloir account.",
};


export default function LoginPage() {
  return <LoginForm />;
}
