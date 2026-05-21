export type Project = {
	title: string;
	description: string;
	repo: string;
};

export const projects: Project[] = [
	{
		title: "Aerial Damage Assessment - Hazardly AI",
		description:
			"Hazardly AI is a full-stack disaster damage assessment platform using satellite imagery, interactive maps, " +
			"and AI-assisted evaluation for building-level damage analysis. " +
			"I worked on the frontend with React, TypeScript, Vite, Tailwind CSS, and Mapbox GL, " +
			"building dashboard views, map workflows, image comparison tools, and data integration. " +
			"I also contributed to the project’s RAG agent for AI-assisted user interaction.",
		repo: "https://github.com/hazardly-ai/aerial-damage-assessment",
	},
	{
		title: "jtol.dev",
		description:
			"jtol.dev is my personal portfolio website built with React, TypeScript, and Vite. " +
			"It showcases my projects, coursework, technical skills, " +
			"and contact information through a responsive interface with light/dark theme support " +
			"and polished interactive UI details.",
		repo: "https://github.com/James5657/jtol.dev",
	},
];
