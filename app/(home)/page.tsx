"use client";

import { Layout } from "@/components/layout";
import { toast } from "sonner";

export default function Home() {
	return (
		<Layout>
			<button type="button" onClick={() => toast.success("Hello, world!")}>
				Click
			</button>
		</Layout>
	);
}
