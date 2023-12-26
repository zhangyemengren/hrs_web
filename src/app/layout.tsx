import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Playfair_Display({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
	title: "Hrs Web",
	description: "Hrs Web Application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}
