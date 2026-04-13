export default function About() {
	return (
		<section
			className="panel section-grid"
			id="about"
			style={{ gridTemplateColumns: "1fr", gap: "0.5rem" }}
		>
			<div>
				<p className="section-label">About</p>
				<h2>Building the foundation for a software engineering career.</h2>
			</div>
			<p className="section-body" style={{ fontWeight: 500 }}>
				I am a Computer Science senior at The University of Texas at Dallas
				working toward software engineering roles where I can contribute to real
				products, collaborate with strong teams, and keep improving as an
				engineer. I am most interested in building reliable applications,
				learning quickly, and turning ideas into solid implementations.
			</p>
		</section>
	);
}
