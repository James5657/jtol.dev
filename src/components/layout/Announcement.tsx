import { useEffect, useRef, useState } from "react";

interface AnnouncementProps {
	message: string;
	icon?: string;
}

export default function Announcement({
	message,
	icon = "🚧",
}: AnnouncementProps) {
	const ref = useRef<HTMLDivElement>(null);
	const [dismissed, setDismissed] = useState(false);

	useEffect(() => {
		const BAR_HEIGHT = "2.5rem";

		const update = () => {
			const atTop = window.scrollY === 0;
			document.documentElement.style.setProperty(
				"--announcement-bar-height",
				atTop && !dismissed ? BAR_HEIGHT : "0px",
			);
			ref.current?.classList.toggle("hidden", !atTop || dismissed);
		};

		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, [dismissed]);

	const dismiss = () => {
		setDismissed(true);
		document.documentElement.style.setProperty(
			"--announcement-bar-height",
			"0px",
		);
		ref.current?.classList.add("hidden");
	};

	return (
		<div className="announcement-bar" ref={ref}>
			{icon && <span className="announcement-bar-icon">{icon}</span>}
			{message}
			{icon && <span className="announcement-bar-icon">{icon}</span>}
			<button
				className="announcement-bar-close"
				onClick={dismiss}
				aria-label="Dismiss"
				type={"button"}
			>
				✕
			</button>
		</div>
	);
}
