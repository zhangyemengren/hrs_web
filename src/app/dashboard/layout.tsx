import Layout from "@/layout/Nav";

export default function DashboardLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<Layout>
			<div>中文</div>
			{children}
		</Layout>
	);
}
