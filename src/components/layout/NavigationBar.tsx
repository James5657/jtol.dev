import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { EMAIL, WEBSITE_NAME } from "@/constants/global";

export const scrollToSection = (id: string) => {
	if (typeof document === "undefined") return;

	const element = document.getElementById(id);
	const navbar = document.querySelector(".site-navbar");

	if (!element) return;

	const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 0;
	const announcementBar = document.querySelector(
		".announcement-bar:not(.hidden)",
	);
	const announcementHeight = announcementBar
		? announcementBar.getBoundingClientRect().height
		: 0;
	const elementTop = element.getBoundingClientRect().top + window.scrollY;

	const SCROLL_OFFSET_BUFFER = 16;
	window.scrollTo({
		top: elementTop - navbarHeight - announcementHeight - SCROLL_OFFSET_BUFFER,
		behavior: "smooth",
	});
};

export default function NavigationBar() {
	const [menuOpen, setMenuOpen] = useState(false);

	const scroll = (id: string) => {
		scrollToSection(id);
		setMenuOpen(false);
	};

	return (
		<header className="site-navbar">
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
					onClick={() => scroll("about")}
					type="button"
				>
					About
				</button>
				<button
					className="nav-link"
					onClick={() => scroll("work")}
					type="button"
				>
					Work
				</button>
				<a href={`mailto:${EMAIL}`} onClick={() => setMenuOpen(false)}>
					Contact
				</a>
				<div className="nav-theme">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
