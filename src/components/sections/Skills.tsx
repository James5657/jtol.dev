import { useState } from "react";
import { type Category, categories, skills } from "@/data/skills";

export default function Skills() {
	const [active, setActive] = useState<Category>("All");

	const filtered =
		active === "All" ? skills : skills.filter((s) => s.category === active);

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
							onClick={() => setActive(cat)}
							className={`skills-filter-pill${active === cat ? " active" : ""}`}
							type={"button"}
						>
							{cat}
						</button>
					))}
				</div>

				{/* Icon grid */}
				<div className="skills-grid">
					{filtered.map((skill) => (
						<div key={skill.name} role={"img"} className="skills-card">
							<i className={skill.icon} />
							<span>{skill.name}</span>
						</div>
					))}
				</div>
			</section>
		</>
	);
}
