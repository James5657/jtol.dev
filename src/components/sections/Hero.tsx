import { scrollToSection } from "@/App";

import Button from "@/components/ui/Button";

const stack = ["React", "TypeScript", "JavaScript", "Software Engineering"];

export default function Hero() {
	return (
		<section className="hero">
			<div className="hero-copy">
				<p className="eyebrow">Computer Science Student</p>
				<h1>James Harrison</h1>
				<p className="hero-subtitle">
					Senior at The University of Texas at Dallas pursuing software
					engineering opportunities.
				</p>
				<p className="lede">
					I am building a strong foundation in software engineering through
					coursework, personal projects, and hands-on development. I am
					passionate about learning new technologies, collaborating with others,
					and creating reliable applications. I am actively seeking internship
					and early-career software engineering roles where I can contribute to
					real products and grow as an engineer.
				</p>
				<div className="hero-actions">
					<a className="button button-primary" href="mailto:hello@jtol.dev">
						Contact me
					</a>
					<Button onClick={() => scrollToSection("work")} variant="secondary">
						View projects
					</Button>
				</div>
			</div>
			<aside className="hero-card">
				<p className="section-label">Current focus</p>
				<ul className="stack-list">
					{stack.map((item) => (
						<li key={item}>{item}</li>
					))}
				</ul>
			</aside>
		</section>
	);
}
