const projects = [
    {
        title: "Full-stack applications",
        description:
            "Projects that combine frontend development, backend logic, and practical problem-solving across the stack.",
    },
    {
        title: "Frontend engineering",
        description:
            "React interfaces focused on maintainability, performance, and clean user experience.",
    },
    {
        title: "Technical growth",
        description:
            "Coursework, personal builds, and team projects that strengthen software engineering fundamentals.",
    },
];

export default function ProjectsSection() {
    return (
        <section className="panel" id="work">
            <div className="section-heading">
                <p className="section-label">Projects</p>
                <h2>What this portfolio showcases</h2>
            </div>
            <div className="feature-grid">
                {projects.map((project) => (
                    <article className="feature-card" key={project.title}>
                        <h3>{project.title}</h3>
                        <p>{project.description}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
