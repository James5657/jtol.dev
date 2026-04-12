import Announcement from "@/components/layout/Announcement";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Coursework from "@/components/sections/Coursework";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import { EMAIL, WEBSITE_VERSION } from "@/constants/global";

export const scrollToSection = (id: string) => {
	document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function App() {
	return (
		<div className="root">
			{WEBSITE_VERSION === "development" && (
				<Announcement message="This website is currently in development." />
			)}
			<Header />
			<Hero />
			<div className="site-shell">
				<main className="page-content">
					<About />
					<Projects />
					<Coursework />
					<Skills />

					<section className="panel cta-panel">
						<div>
							<p className="section-label">Opportunities</p>
							<h2>
								Looking for internship and early-career software engineering
								roles.
							</h2>
						</div>
						<a className="button button-primary" href={`mailto:${EMAIL}`}>
							Reach out
						</a>
					</section>
				</main>
			</div>
		</div>
	);
}
