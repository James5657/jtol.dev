import Header from "./components/layout/Header";

export default function App() {
    const scrollToAbout = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    const highlights = [
        "Basic one-page layout",
        "React + Vite setup",
        "Biome for formatting and linting",
    ];

    return (
        <div className="site-shell">
            <Header />
            <main>
                <section className="hero">
                    <p className="eyebrow">jtol.dev</p>
                    <h1>
                        A basic website foundation that is ready to build on.
                    </h1>
                    <p className="lede">
                        The stack is intentionally simple right now: React,
                        Vite, one page, and Biome for code quality.
                    </p>
                    <div className="hero-actions">
                        <a
                            className="button button-primary"
                            href="mailto:hello@jtol.dev"
                        >
                            Contact
                        </a>
                        <button
                            className="button button-secondary"
                            onClick={scrollToAbout}
                            type="button"
                        >
                            Learn more
                        </button>
                    </div>
                </section>

                <section className="panel" id="about">
                    <p className="section-label">What&apos;s included</p>
                    <div className="feature-grid">
                        {highlights.map((item) => (
                            <article className="feature-card" key={item}>
                                <h2>{item}</h2>
                                <p>
                                    Replace this placeholder copy with your own
                                    content when you're ready to go.
                                </p>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
