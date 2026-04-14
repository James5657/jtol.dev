export type Skill = {
	name: string;
	category: string;
	icon: string; // devicon class
};

export const skills: Skill[] = [
	// Languages
	{
		name: "JavaScript",
		category: "Languages",
		icon: "devicon-javascript-plain colored",
	},
	{
		name: "TypeScript",
		category: "Languages",
		icon: "devicon-typescript-plain colored",
	},
	{
		name: "Python",
		category: "Languages",
		icon: "devicon-python-plain colored",
	},
	{
		name: "Java",
		category: "Languages",
		icon: "devicon-java-plain colored",
	},
	{
		name: "C++",
		category: "Languages",
		icon: "devicon-cplusplus-plain colored",
	},
	{
		name: "SQL",
		category: "Languages",
		icon: "devicon-sqldeveloper-plain",
	},
	// Frontend
	{
		name: "React",
		category: "Frontend",
		icon: "devicon-react-original colored",
	},
	{
		name: "HTML",
		category: "Frontend",
		icon: "devicon-html5-plain colored",
	},
	{
		name: "CSS",
		category: "Frontend",
		icon: "devicon-css3-plain colored",
	},
	// Backend
	{
		name: "Node.js",
		category: "Backend",
		icon: "devicon-nodejs-plain colored",
	},
	// Databases
	{
		name: "MySQL",
		category: "Databases",
		icon: "devicon-mysql-plain colored",
	},
	{
		name: "PostgreSQL",
		category: "Databases",
		icon: "devicon-postgresql-plain colored",
	},
	// Tools
	{
		name: "Vite",
		category: "Tools",
		icon: "devicon-vitejs-plain colored",
	},
	{
		name: "Vercel",
		category: "Tools",
		icon: "devicon-vercel-plain",
	},
	{
		name: "Git",
		category: "Tools",
		icon: "devicon-git-plain colored",
	},
	{
		name: "GitHub",
		category: "Tools",
		icon: "devicon-github-original",
	},
	{
		name: "Visual Studio Code",
		category: "Tools",
		icon: "devicon-vscode-plain colored",
	},
	{
		name: "Visual Studio",
		category: "Tools",
		icon: "devicon-visualstudio-plain colored",
	},
	{
		name: "IntelliJ",
		category: "Tools",
		icon: "devicon-intellij-plain colored",
	},
	{
		name: "PyCharm",
		category: "Tools",
		icon: "devicon-pycharm-plain colored",
	},
	{
		name: "WebStorm",
		category: "Tools",
		icon: "devicon-webstorm-plain colored",
	},
];

export type Category = "All" | (typeof skills)[number]["category"];

export const categories: Category[] = [
	"All",
	...([...new Set(skills.map((s) => s.category))] as Category[]),
];
