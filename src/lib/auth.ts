import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "./prisma";

export const { auth, handlers } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [Github, Google],
});
