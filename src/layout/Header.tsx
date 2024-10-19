import { auth } from "@/src/lib/auth";
import { MessagesSquare } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "../theme/ThemeToggle";

export const Header = async () => {
	const session = await auth();

	return (
		<header className="border-b border-b-accent fixed top-0 z-40 bg-background w-full">
			<div className="container flex items-center py-2 max-w-lg m-auto gap-1">
				<h2 className="text-2xl font-bold mr-auto">
					<Link href="/" className="flex flex-row gap-1">
						<MessagesSquare />
						App
					</Link>
				</h2>

				<ThemeToggle />
			</div>
		</header>
	);
};
