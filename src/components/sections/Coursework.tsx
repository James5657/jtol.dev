import { coursework } from "@/data/coursework";

function getCatalogHref(code: string, year: number) {
	return `https://catalog.utdallas.edu/${String(year)}/undergraduate/courses/${code.toLowerCase().replace(/\s+/g, "")}`;
}

export default function Coursework() {
	return (
		<section className="panel coursework-panel" id="coursework">
			<div className="coursework-header">
				<div className="section-heading">
					<p className="section-label">Relevant Coursework</p>
					<h2>Computer science courses most relevant to my work.</h2>
				</div>
			</div>

			<div className="coursework-grid">
				{coursework.map((course) => (
					<article className="coursework-card" key={course.code}>
						<div className="coursework-card-top">
							<span className="coursework-code">{course.code}</span>
							<span className="coursework-area">{course.area}</span>
						</div>
						<h3>
							<a
								className="coursework-link"
								href={getCatalogHref(course.code, course.year)}
								target="_blank"
								rel="noopener noreferrer"
							>
								{course.title}
							</a>
						</h3>
					</article>
				))}
			</div>
		</section>
	);
}
