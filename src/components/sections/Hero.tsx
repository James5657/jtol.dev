import { useRef } from "react";
import { scrollToSection } from "@/components/layout/NavigationBar";
import Button from "@/components/ui/Button";
import { NAME } from "@/data/global";
import HeroBackground from "./HeroBackground";

export default function Hero() {
	const scrollArrowRef = useRef<HTMLSpanElement | null>(null);

	const setScrollHintSpeed = (playbackRate: number) => {
		const animations = scrollArrowRef.current?.getAnimations() ?? [];

		for (const animation of animations) {
			animation.updatePlaybackRate(playbackRate);
		}
	};

	return (
		<section className="hero">
			<HeroBackground />

			<div className="hero-inner">
				<div className="hero-copy">
					<p className="eyebrow">Computer Science Student — UT Dallas</p>
					<h1>{NAME}</h1>
					<p className="hero-subtitle">
						CS Senior pursuing software engineering opportunities. Building
						reliable applications and growing through real-world experience.
					</p>
					<div className="hero-actions">
						<Button onClick={() => scrollToSection("contact")}>
							Contact me
						</Button>
						<Button
							onClick={() => scrollToSection("projects")}
							variant="secondary"
						>
							View projects
						</Button>
					</div>
				</div>
			</div>

			<button
				className="scroll-hint"
				onClick={() => scrollToSection("about")}
				onBlur={() => setScrollHintSpeed(1)}
				onFocus={() => setScrollHintSpeed(2)}
				onPointerEnter={() => setScrollHintSpeed(2)}
				onPointerLeave={() => setScrollHintSpeed(1)}
				aria-label="Scroll to next section"
				type="button"
			>
				<span>Scroll</span>
				<span
					ref={scrollArrowRef}
					className="scroll-arrow"
					aria-hidden="true"
				/>
			</button>
		</section>
	);
}
