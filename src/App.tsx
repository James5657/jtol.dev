import { Analytics } from "@vercel/analytics/react";
import Announcement from "@/components/layout/Announcement";
import NavigationBar from "@/components/layout/NavigationBar";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Coursework from "@/components/sections/Coursework";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { WEBSITE_VERSION } from "@/data/global";

export default function App() {
	return (
		<div className="root">
			{WEBSITE_VERSION === "development" && (
				<Announcement message="This website is currently in development." />
			)}
			<NavigationBar />
			<Hero />
			<div className="site-shell">
				<main className="page-content">
					<About />
					<Projects />
					<Coursework />
					<Skills />
					<Contact />
				</main>
			</div>
			<Analytics />
		</div>
	);
}
