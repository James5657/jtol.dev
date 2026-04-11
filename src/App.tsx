import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import Button from "@/components/ui/Button";

const stack = ["React", "TypeScript", "JavaScript", "Software Engineering"];

export default function App() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="site-shell">
            <Header />
            <main className="page-content">
                <section className="hero">
                    <div className="hero-copy">
                        <p className="eyebrow">Computer Science Student</p>
                        <h1>James Harrison</h1>
                        <p className="hero-subtitle">
                            Senior at The University of Texas at Dallas pursuing
                            software engineering opportunities.
                        </p>
                        <p className="lede">
                            I am building a strong foundation in software
                            engineering through coursework, personal projects,
                            and hands-on development. This portfolio highlights
                            the work I am doing now and the kind of engineering
                            roles I want to grow into.
                        </p>
                        <div className="hero-actions">
                            <a
                                className="button button-primary"
                                href="mailto:hello@jtol.dev"
                            >
                                Contact me
                            </a>
                            <Button
                                onClick={() => scrollToSection("work")}
                                variant="secondary"
                            >
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

                <AboutSection />
                <ProjectsSection />

                <section className="panel cta-panel">
                    <div>
                        <p className="section-label">Opportunities</p>
                        <h2>
                            Looking for internship and early-career software
                            engineering roles.
                        </h2>
                    </div>
                    <a
                        className="button button-primary"
                        href="mailto:hello@jtol.dev"
                    >
                        Reach out
                    </a>
                </section>
            </main>
        </div>
    );
}
