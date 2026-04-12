import { scrollToSection } from "@/App";
import Button from "@/components/ui/Button";

import { EMAIL, NAME } from "@/constants/global";

const stack = ["React", "TypeScript", "JavaScript", "Software Engineering"];

export default function Hero() {
	return (
		<section className="hero">
			<div className="accent-blob" />

			<div className="hero-inner">
				<div className="hero-copy">
					<p className="eyebrow">Computer Science Student — UT Dallas</p>
					<h1>{NAME}</h1>
					<p className="hero-subtitle">
						Senior pursuing software engineering opportunities. Building
						reliable applications and growing through real-world experience.
					</p>
					<div className="hero-actions">
						<a className="button button-primary" href={`mailto:${EMAIL}`}>
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
					<hr className="hero-divider" />
					<div className="open-badge">
						<span className="pulse-dot" />
						Open to work
					</div>
					<p className="open-tag">
						Actively seeking internship and early-career roles in software
						engineering.
					</p>
				</aside>
			</div>

			<button
				className="scroll-hint"
				onClick={() => scrollToSection("about")}
				aria-label="Scroll to next section"
				type="button"
			>
				<span>Scroll</span>
				<div className="scroll-arrow" />
			</button>
		</section>
	);
}
