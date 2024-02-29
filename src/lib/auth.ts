import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import { prisma } from "./prisma";

export const { auth, handlers } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GithubProvider, GoogleProvider],
});
