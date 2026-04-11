export default function Header() {
    const scrollToAbout = () => {
        document
            .getElementById("about")
            ?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="site-header">
            <a className="brand" href="/">
                jtol.dev
            </a>
            <nav className="nav">
                <button
                    className="nav-link"
                    onClick={scrollToAbout}
                    type="button"
                >
                    About
                </button>
                <a href="mailto:hello@jtol.dev">Contact</a>
            </nav>
        </header>
    );
}
