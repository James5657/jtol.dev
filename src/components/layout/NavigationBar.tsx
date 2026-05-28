import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { WEBSITE_NAME } from "@/data/global";

const SCROLL_OFFSET_BUFFER = 16;

function parsePixelValue(value: string) {
	const parsed = Number.parseFloat(value);
	return Number.isFinite(parsed) ? parsed : 0;
}

function getCollapsedNavbarHeight(navbar: HTMLElement) {
	const navbarRect = navbar.getBoundingClientRect();
	const navbarStyles = window.getComputedStyle(navbar);
	const menu = navbar.querySelector<HTMLElement>(".nav");
	let expandedMenuHeight = 0;

	if (menu) {
		const menuStyles = window.getComputedStyle(menu);

		if (menuStyles.display !== "contents") {
			const menuHeight =
				menu.getBoundingClientRect().height +
				parsePixelValue(menuStyles.marginTop) +
				parsePixelValue(menuStyles.marginBottom);

			expandedMenuHeight =
				menuHeight > 0 ? menuHeight + parsePixelValue(navbarStyles.rowGap) : 0;
		}
	}

	return Math.max(
		parsePixelValue(navbarStyles.minHeight),
		navbarRect.height - expandedMenuHeight,
	);
}

export const scrollToSection = (id: string) => {
	if (typeof document === "undefined") return;

	const element = document.getElementById(id);
	const navbar = document.querySelector<HTMLElement>(".site-navbar");

	if (!element) return;

	const announcementBar = document.querySelector(
		".announcement-bar:not(.hidden)",
	);
	const announcementHeight = announcementBar
		? announcementBar.getBoundingClientRect().height
		: 0;
	const navbarTop = navbar
		? Math.max(0, navbar.getBoundingClientRect().top - announcementHeight)
		: 0;
	const navbarHeight = navbar ? getCollapsedNavbarHeight(navbar) : 0;
	const elementTop = element.getBoundingClientRect().top + window.scrollY;

	window.scrollTo({
		top:
			elementTop -
			announcementHeight -
			navbarTop -
			navbarHeight -
			SCROLL_OFFSET_BUFFER,
		behavior: "smooth",
	});
};

export default function NavigationBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const menuId = "site-navigation";

	useEffect(() => {
		if (!menuOpen) {
			return;
		}

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setMenuOpen(false);
			}
		};

		window.addEventListener("keydown", handleKeyDown);

		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [menuOpen]);

	const scroll = (id: string) => {
		setMenuOpen(false);
		setTimeout(() => scrollToSection(id), 0);
	};

	return (
		<header className={`site-navbar ${menuOpen ? "nav-expanded" : ""}`}>
			<a className="brand" href="/" onClick={() => setMenuOpen(false)}>
				{WEBSITE_NAME}
			</a>

			<button
				className="hamburger"
				onClick={() => setMenuOpen((o) => !o)}
				aria-label={menuOpen ? "Close menu" : "Open menu"}
				aria-controls={menuId}
				aria-expanded={menuOpen}
				type="button"
			>
				<span className={`hamburger-icon ${menuOpen ? "open" : ""}`} />
			</button>

			<nav className={`nav ${menuOpen ? "nav-open" : ""}`} id={menuId}>
				<div className="nav-links">
					<button
						className="nav-link"
						onClick={() => scroll("about")}
						type="button"
					>
						About
					</button>
					<button
						className="nav-link"
						onClick={() => scroll("projects")}
						type="button"
					>
						Projects
					</button>
					<button
						className="nav-link"
						onClick={() => scroll("coursework")}
						type="button"
					>
						Coursework
					</button>
					<button
						className="nav-link"
						onClick={() => scroll("skills")}
						type="button"
					>
						Skills
					</button>
					<button
						className="nav-link"
						onClick={() => scroll("contact")}
						type="button"
					>
						Contact
					</button>
				</div>
				<div className="nav-theme">
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
