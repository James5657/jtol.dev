import { useLayoutEffect, useRef, useState } from "react";
import { type Category, categories, skills } from "@/data/skills";

type SkillPosition = {
	left: number;
	top: number;
};

function getDocumentPosition(element: HTMLElement): SkillPosition {
	const rect = element.getBoundingClientRect();

	return {
		left: rect.left + window.scrollX,
		top: rect.top + window.scrollY,
	};
}

export default function Skills() {
	const [active, setActive] = useState<Category>("All");
	const gridRef = useRef<HTMLDivElement>(null);
	const previousPositionsRef = useRef<Map<string, SkillPosition>>(new Map());

	const filtered =
		active === "All" ? skills : skills.filter((s) => s.category === active);

	useLayoutEffect(() => {
		const previousPositions = previousPositionsRef.current;

		if (previousPositions.size === 0) {
			return;
		}

		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		if (reduceMotion) {
			previousPositions.clear();
			return;
		}

		const cards =
			gridRef.current?.querySelectorAll<HTMLElement>("[data-skill-name]");

		for (const card of cards ?? []) {
			const previousPosition = previousPositions.get(
				card.dataset.skillName ?? "",
			);
			for (const animation of card.getAnimations()) {
				animation.cancel();
			}
			const currentPosition = getDocumentPosition(card);

			if (!previousPosition) {
				card.animate(
					[
						{ opacity: 0, transform: "scale(0.94)" },
						{ opacity: 1, transform: "scale(1)" },
					],
					{
						duration: 220,
						easing: "cubic-bezier(0.22, 1, 0.36, 1)",
					},
				);
				continue;
			}

			const deltaX = previousPosition.left - currentPosition.left;
			const deltaY = previousPosition.top - currentPosition.top;

			if (deltaX === 0 && deltaY === 0) {
				continue;
			}

			card.animate(
				[
					{ transform: `translate(${deltaX}px, ${deltaY}px)` },
					{ transform: "translate(0, 0)" },
				],
				{
					duration: 360,
					easing: "cubic-bezier(0.22, 1, 0.36, 1)",
				},
			);
		}

		previousPositions.clear();
	});

	function changeCategory(category: Category) {
		if (category === active) {
			return;
		}

		const cards =
			gridRef.current?.querySelectorAll<HTMLElement>("[data-skill-name]");

		previousPositionsRef.current = new Map(
			[...(cards ?? [])].map((card) => [
				card.dataset.skillName ?? "",
				getDocumentPosition(card),
			]),
		);

		setActive(category);
	}

	return (
		<>
			{/* Devicons CDN */}
			<link
				rel="stylesheet"
				href={
					"https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
				}
			/>

			<section className="panel" id="skills">
				{/* Header */}
				<div className="section-heading">
					<p className="section-label">Skills</p>
				</div>

				{/* Filter pills */}
				<div className="skills-filter-bar">
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => changeCategory(cat)}
							className={`skills-filter-pill${active === cat ? " active" : ""}`}
							type={"button"}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Icon grid */}
				<div className="skills-grid" ref={gridRef}>
					{filtered.map((skill) => (
						<div
							key={skill.name}
							role={"img"}
							className="skills-card"
							data-skill-name={skill.name}
						>
							<i className={skill.icon} />
							<span>{skill.name}</span>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
