import { useEffect, useRef } from "react";

type Particle = {
	x: number;
	y: number;
	baseX: number;
	baseY: number;
	vx: number;
	vy: number;
	size: number;
	phase: number;
};

const PARTICLE_DENSITY = 12500;
const MAX_PARTICLES = 95;
const MIN_PARTICLES = 42;

function getCssColor(name: string, fallback: string) {
	const value = getComputedStyle(document.documentElement)
		.getPropertyValue(name)
		.trim();

	return value || fallback;
}

function getCssNumber(name: string, fallback: number) {
	const value = Number.parseFloat(
		getComputedStyle(document.documentElement).getPropertyValue(name),
	);

	return Number.isFinite(value) ? value : fallback;
}

function hexToRgb(hex: string) {
	const normalized = hex.replace("#", "");
	const value =
		normalized.length === 3
			? normalized
					.split("")
					.map((char) => char + char)
					.join("")
			: normalized;
	const number = Number.parseInt(value, 16);

	return {
		r: (number >> 16) & 255,
		g: (number >> 8) & 255,
		b: number & 255,
	};
}

function toRgbString(color: string, fallback: string) {
	if (color.startsWith("#")) {
		const rgb = hexToRgb(color);
		return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
	}

	const match = color.match(/\d+(\.\d+)?/g);
	return match ? match.slice(0, 3).join(", ") : fallback;
}

export default function HeroBackground() {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) {
			return;
		}

		const context = canvas.getContext("2d", { alpha: true });
		if (!context) {
			return;
		}

		const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
		let animationFrame = 0;
		let width = 0;
		let height = 0;
		let pixelRatio = 1;
		let particles: Particle[] = [];
		let accentRgb = "236, 15, 51";
		let textRgb = "24, 22, 20";
		let lineRgb = "79, 68, 62";
		let lineOpacity = 0.3;
		let lineWidth = 1.15;
		let lineHighlightOpacity = 0.28;
		let lineHighlightRadius = 280;
		let lineHighlightWidth = 0.6;

		const syncColors = () => {
			accentRgb = toRgbString(
				getCssColor("--accent", "#ec0f33"),
				"236, 15, 51",
			);
			textRgb = toRgbString(getCssColor("--text", "#181614"), "24, 22, 20");
			lineRgb = toRgbString(
				getCssColor("--hero-node-line", "#4f443e"),
				"79, 68, 62",
			);
			lineOpacity = getCssNumber("--hero-node-line-opacity", 0.3);
			lineWidth = getCssNumber("--hero-node-line-width", 1.15);
			lineHighlightOpacity = getCssNumber(
				"--hero-node-line-highlight-opacity",
				0.28,
			);
			lineHighlightRadius = getCssNumber(
				"--hero-node-line-highlight-radius",
				280,
			);
			lineHighlightWidth = getCssNumber(
				"--hero-node-line-highlight-width",
				0.6,
			);
		};

		const createParticles = () => {
			const count = Math.min(
				MAX_PARTICLES,
				Math.max(
					MIN_PARTICLES,
					Math.round((width * height) / PARTICLE_DENSITY),
				),
			);

			particles = Array.from({ length: count }, (_, index) => {
				const columnCount = Math.ceil(Math.sqrt(count * (width / height)));
				const rowCount = Math.ceil(count / columnCount);
				const column = index % columnCount;
				const row = Math.floor(index / columnCount);
				const baseX =
					((column + 0.5) / columnCount) * width +
					(Math.random() - 0.5) * Math.min(90, width * 0.08);
				const baseY =
					((row + 0.5) / rowCount) * height +
					(Math.random() - 0.5) * Math.min(90, height * 0.08);

				return {
					x: baseX,
					y: baseY,
					baseX,
					baseY,
					vx: 0,
					vy: 0,
					size: 1.2 + Math.random() * 2.2,
					phase: Math.random() * Math.PI * 2,
				};
			});
		};

		const resize = () => {
			const bounds = canvas.getBoundingClientRect();
			width = bounds.width;
			height = bounds.height;
			pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
			canvas.width = Math.round(width * pixelRatio);
			canvas.height = Math.round(height * pixelRatio);
			context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			syncColors();
			createParticles();
		};

		const draw = (time: number) => {
			context.clearRect(0, 0, width, height);

			const pointer = pointerRef.current;
			const pointerX = pointer.x * width;
			const pointerY = pointer.y * height;
			const wave = time * 0.001;

			const sweep = context.createLinearGradient(0, 0, width, height);
			sweep.addColorStop(0, `rgba(${accentRgb}, 0.04)`);
			sweep.addColorStop(0.45, `rgba(${textRgb}, 0.02)`);
			sweep.addColorStop(1, `rgba(${accentRgb}, 0.1)`);
			context.fillStyle = sweep;
			context.fillRect(0, 0, width, height);

			for (const particle of particles) {
				const driftX = Math.cos(wave + particle.phase) * 10;
				const driftY = Math.sin(wave * 0.78 + particle.phase) * 12;
				const dx = particle.x - pointerX;
				const dy = particle.y - pointerY;
				const distance = Math.hypot(dx, dy) || 1;
				const radius = Math.min(width, height) * 0.34;
				const pull = pointer.active ? Math.max(0, 1 - distance / radius) : 0;
				const targetX = particle.baseX + driftX + (dx / distance) * pull * 34;
				const targetY = particle.baseY + driftY + (dy / distance) * pull * 34;

				particle.vx += (targetX - particle.x) * 0.018;
				particle.vy += (targetY - particle.y) * 0.018;
				particle.vx *= 0.9;
				particle.vy *= 0.9;
				particle.x += particle.vx;
				particle.y += particle.vy;
			}

			for (let i = 0; i < particles.length; i += 1) {
				for (let j = i + 1; j < particles.length; j += 1) {
					const a = particles[i];
					const b = particles[j];
					const distance = Math.hypot(a.x - b.x, a.y - b.y);
					const maxDistance = Math.min(165, width * 0.16);

					if (distance < maxDistance) {
						const linkStrength = 1 - distance / maxDistance;
						const midpointX = (a.x + b.x) / 2;
						const midpointY = (a.y + b.y) / 2;
						const pointerDistance = Math.hypot(
							midpointX - pointerX,
							midpointY - pointerY,
						);
						const highlight = pointer.active
							? Math.max(0, 1 - pointerDistance / lineHighlightRadius)
							: 0;

						const opacity = linkStrength * lineOpacity;
						context.strokeStyle = `rgba(${lineRgb}, ${opacity})`;
						context.lineWidth =
							lineWidth + highlight * lineHighlightWidth * 0.4;
						context.beginPath();
						context.moveTo(a.x, a.y);
						context.lineTo(b.x, b.y);
						context.stroke();

						if (highlight > 0) {
							context.strokeStyle = `rgba(${accentRgb}, ${
								linkStrength * highlight * lineHighlightOpacity
							})`;
							context.lineWidth = lineWidth + highlight * lineHighlightWidth;
							context.beginPath();
							context.moveTo(a.x, a.y);
							context.lineTo(b.x, b.y);
							context.stroke();
						}
					}
				}
			}

			for (const particle of particles) {
				const distance = Math.hypot(
					particle.x - pointerX,
					particle.y - pointerY,
				);
				const glow = pointer.active ? Math.max(0, 1 - distance / 220) : 0;
				context.fillStyle = `rgba(${accentRgb}, ${0.34 + glow * 0.42})`;
				context.beginPath();
				context.arc(
					particle.x,
					particle.y,
					particle.size + glow * 2.4,
					0,
					Math.PI * 2,
				);
				context.fill();
			}

			const beamX = pointer.active
				? pointerX
				: width * (0.5 + Math.cos(wave) * 0.08);
			const beamY = pointer.active
				? pointerY
				: height * (0.5 + Math.sin(wave) * 0.08);
			const beam = context.createRadialGradient(
				beamX,
				beamY,
				0,
				beamX,
				beamY,
				Math.min(width, height) * 0.48,
			);
			beam.addColorStop(
				0,
				`rgba(${accentRgb}, ${pointer.active ? 0.2 : 0.12})`,
			);
			beam.addColorStop(0.42, `rgba(${accentRgb}, 0.07)`);
			beam.addColorStop(1, "rgba(0, 0, 0, 0)");
			context.fillStyle = beam;
			context.fillRect(0, 0, width, height);

			if (!reduceMotion.matches) {
				animationFrame = window.requestAnimationFrame(draw);
			}
		};

		const handlePointerMove = (event: PointerEvent) => {
			const bounds = canvas.getBoundingClientRect();
			const isInside =
				event.clientX >= bounds.left &&
				event.clientX <= bounds.right &&
				event.clientY >= bounds.top &&
				event.clientY <= bounds.bottom;

			pointerRef.current = {
				x: (event.clientX - bounds.left) / bounds.width,
				y: (event.clientY - bounds.top) / bounds.height,
				active: isInside,
			};
		};

		const handlePointerLeave = () => {
			pointerRef.current.active = false;
		};

		const observer = new ResizeObserver(resize);
		const themeObserver = new MutationObserver(syncColors);
		observer.observe(canvas);
		themeObserver.observe(document.documentElement, {
			attributeFilter: ["data-theme"],
			attributes: true,
		});
		window.addEventListener("pointermove", handlePointerMove);
		window.addEventListener("blur", handlePointerLeave);

		resize();
		draw(0);

		const handleMotionChange = () => {
			window.cancelAnimationFrame(animationFrame);
			draw(0);
		};

		reduceMotion.addEventListener("change", handleMotionChange);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			observer.disconnect();
			themeObserver.disconnect();
			window.removeEventListener("pointermove", handlePointerMove);
			window.removeEventListener("blur", handlePointerLeave);
			reduceMotion.removeEventListener("change", handleMotionChange);
		};
	}, []);

	return (
		<div className="hero-background" aria-hidden="true">
			<canvas ref={canvasRef} className="hero-background-canvas" />
			<div className="hero-background-grid" />
			<div className="hero-background-vignette" />
		</div>
	);
}
