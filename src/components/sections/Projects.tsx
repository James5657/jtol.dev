import { FaGithub } from "react-icons/fa";

const projects = [
	{
		title: "Aerial Damage Assessment - Hazardly AI",
		description: "Automated Disaster Damage Assessment from Aerial Imagery",
		repo: "https://github.com/hazardly-ai/aerial-damage-assessment",
	},
	{
		title: "jtol.dev",
		description:
			"My personal portfolio website. Developed using TypeScript + React.",
		repo: "https://github.com/James5657/jtol.dev",
	},
];

function getGridStyle(count: number): React.CSSProperties {
	const cols = Math.min(count, 3);
	return {
		gridTemplateColumns: `repeat(${String(cols)}, minmax(0, 1fr))`,
	};
}

export default function Projects() {
	return (
		<section className="panel" id="work">
			<div className="section-heading">
				<p className="section-label">Projects</p>
			</div>
			<div className="feature-grid" style={getGridStyle(projects.length)}>
				{projects.map((project) => (
					<article className="feature-card" key={project.title}>
						<a
							href={project.repo}
							target="_blank"
							rel="noopener noreferrer"
							className="github-icon"
						>
							<FaGithub />
						</a>
						<h3>{project.title}</h3>
						<p>{project.description}</p>
					</article>
				))}
			</div>
		</section>
	);
}
