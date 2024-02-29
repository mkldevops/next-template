"use client";

import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

export const LoginGithubButton = () => {
  return (
    <Button onClick={() => signIn("github")}>
      <Github /> Login
    </Button>
  );
};

export const LoginGoogleButton = () => {
  return <Button onClick={() => signIn("google")}>Google Login</Button>;
};

export const LogoutButton = () => {
  return <Button onClick={() => signOut()}>Logout</Button>;
};
