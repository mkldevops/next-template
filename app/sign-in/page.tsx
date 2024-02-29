import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { LoginGithubButton, LoginGoogleButton } from "./AuthButton";

export default async function SignInPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="container mx-auto items-center">
      <h1>Please sign in</h1>
      <p>Sign in with your Google or GitHub account.</p>
      <div>
        <LoginGithubButton />
      </div>
      <p>Click the button below to sign in with Google:</p>
      <div>
        <LoginGoogleButton />
      </div>
    </div>
  );
}
