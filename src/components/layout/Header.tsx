import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
    const scrollToSection = (id: string) => {
        if (typeof document === "undefined") {
            return;
        }

        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header className="site-header">
            <a className="brand" href="/">
                jtol.dev
            </a>
            <nav className="nav">
                <button
                    className="nav-link"
                    onClick={() => scrollToSection("about")}
                    type="button"
                >
                    About
                </button>
                <button
                    className="nav-link"
                    onClick={() => scrollToSection("work")}
                    type="button"
                >
                    Work
                </button>
                <a href="mailto:hello@jtol.dev">Contact</a>
                <ThemeToggle />
            </nav>
        </header>
    );
}
