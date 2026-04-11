import { useEffect, useState } from "react";
import Button from "./Button";

const themeStorageKey = "jtol-theme";

function getInitialTheme(): "light" | "dark" {
    if (typeof window === "undefined") {
        return "light";
    }

    const savedTheme = window.localStorage.getItem(themeStorageKey);

    if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        window.localStorage.setItem(themeStorageKey, theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((currentTheme) =>
            currentTheme === "light" ? "dark" : "light",
        );
    };

    const label =
        theme === "light" ? "Switch to dark mode" : "Switch to light mode";

    return (
        <Button
            aria-label={label}
            className="theme-toggle"
            onClick={toggleTheme}
            title={label}
            variant="ghost"
        >
            <span aria-hidden="true" className="theme-toggle-icon">
                {theme === "light" ? "☾" : "☀"}
            </span>
        </Button>
    );
}
