import { hasActiveSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import LoginForm from "./loginForm";

export default async function LoginPage() {
  const hasSession = await hasActiveSession();
  if (hasSession) {
    redirect("/"); // Redirect if user has valid access token
  }

  return <LoginForm />;
}
