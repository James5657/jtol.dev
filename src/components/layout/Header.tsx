import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { WEBSITE_NAME } from "@/constants/global";

export default function Header() {
	const [menuOpen, setMenuOpen] = useState(false);

	const scrollToSection = (id: string) => {
		if (typeof document === "undefined") return;
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
		setMenuOpen(false);
	};

	return (
		<header className="site-header">
			<a className="brand" href="/">
				{WEBSITE_NAME}
			</a>

			<button
				className="hamburger"
				onClick={() => setMenuOpen((o) => !o)}
				aria-label={menuOpen ? "Close menu" : "Open menu"}
				aria-expanded={menuOpen}
				type="button"
			>
				<span className={`hamburger-icon ${menuOpen ? "open" : ""}`} />
			</button>

			<nav className={`nav ${menuOpen ? "nav-open" : ""}`}>
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
				<a href="mailto:hello@jtol.dev" onClick={() => setMenuOpen(false)}>
					Contact
				</a>
				<div className="nav-theme">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
