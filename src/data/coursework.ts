export type Coursework = {
	code: string;
	title: string;
	area: string;
	year: number;
};

export const coursework: Coursework[] = [
	{
		code: "CS 3345",
		title: "Data Structures and Algorithms",
		area: "Core CS",
		year: 2025,
	},
	{
		code: "CS 3354",
		title: "Software Engineering",
		area: "Engineering",
		year: 2024,
	},
	{
		code: "CS 3377",
		title: "Systems Programming in UNIX and Other Environments",
		area: "Systems",
		year: 2024,
	},
	{
		code: "CS 4347",
		title: "Database Systems",
		area: "Data",
		year: 2025,
	},
	{
		code: "CS 4376",
		title: "Object-Oriented Design",
		area: "Engineering",
		year: 2025,
	},
	{
		code: "SE 4381",
		title: "Software Project Planning and Management",
		area: "Delivery",
		year: 2024,
	},
];
