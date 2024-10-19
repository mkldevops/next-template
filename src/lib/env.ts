import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "test", "production"]),
		GITHUB_ID: z.string(),
		GITHUB_SECRET: z.string(),
		GOOGLE_ID: z.string(),
		GOOGLE_SECRET: z.string(),
		NEXTAUTH_SECRET: z.string(),
		NEXTAUTH_URL: z.string(),
	},
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string(),
	},
	runtimeEnv: {
		NODE_ENV: process.env.NODE_ENV,
		GITHUB_ID: process.env.GITHUB_ID,
		GITHUB_SECRET: process.env.GITHUB_SECRET,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		GOOGLE_ID: process.env.GOOGLE_ID,
		GOOGLE_SECRET: process.env.GOOGLE_SECRET,
	},
});
