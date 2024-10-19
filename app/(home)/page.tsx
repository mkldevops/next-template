import { buttonVariants } from "@/components/ui/button";
import { auth } from "@/src/lib/auth";
import Link from "next/link";
import { LogoutButton } from "../sign-in/AuthButton";

export default async function Home() {
	const session = await auth();
	console.log("session", session);

	return (
		<div>
			<h1>
				{session?.user ? (
					`Hello, ${session.user.name}`
				) : (
					<Link
						href="/sign-in"
						className={buttonVariants({ variant: "ghost" })}
					>
						Sign in
					</Link>
				)}
			</h1>

			{session?.user ? <LogoutButton /> : null}
		</div>
	);
}
