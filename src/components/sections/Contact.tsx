import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail, MdLanguage } from "react-icons/md";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, WEBSITE_URL } from "@/data/global";

const contactLinks = [
	{
		label: "Email",
		value: EMAIL,
		href: `mailto:${EMAIL}`,
		icon: MdEmail,
	},
	{
		label: "GitHub",
		value: "James5657",
		href: GITHUB_URL,
		icon: FaGithub,
	},
	{
		label: "LinkedIn",
		value: "jamestharr",
		href: LINKEDIN_URL,
		icon: FaLinkedin,
	},
	{
		label: "Website",
		value: WEBSITE_URL.replace("https://", ""),
		href: WEBSITE_URL,
		icon: MdLanguage,
	},
];

export default function Contact() {
	return (
		<section className="panel contact-panel" id="contact">
			<div className="contact-intro">
				<p className="section-label">Contact</p>
				<h2>
					Looking for internship and early-career software engineering roles.
				</h2>
				<p>
					Send me a note or find me elsewhere online. I am most responsive by
					email, and my projects stay current on GitHub.
				</p>
			</div>

			<nav className="contact-links" aria-label="Contact and social links">
				{contactLinks.map(({ label, value, href, icon: Icon }) => (
					<a
						className="contact-link"
						href={href}
						key={label}
						target={href.startsWith("mailto:") ? undefined : "_blank"}
						rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
					>
						<span className="contact-link-icon" aria-hidden="true">
							<Icon />
						</span>
						<span className="contact-link-copy">
							<span>{label}</span>
							<strong>{value}</strong>
						</span>
					</a>
				))}
			</nav>
		</section>
	);
}
