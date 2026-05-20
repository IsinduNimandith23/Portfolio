import {
	SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss, SiReact,
	SiNodedotjs, SiGo, SiRust, SiRuby, SiPhp, SiCplusplus, SiC,
	SiKotlin, SiSwift, SiDart, SiShell, SiMarkdown, SiGithub,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const LANGUAGE_ICONS = {
	Python: SiPython,
	JavaScript: SiJavascript,
	TypeScript: SiTypescript,
	HTML: SiHtml5,
	CSS: SiCss,
	"Jupyter Notebook": SiPython,
	React: SiReact,
	"Node.js": SiNodedotjs,
	Go: SiGo,
	Rust: SiRust,
	Ruby: SiRuby,
	PHP: SiPhp,
	"C++": SiCplusplus,
	C: SiC,
	Java: FaJava,
	Kotlin: SiKotlin,
	Swift: SiSwift,
	Dart: SiDart,
	Shell: SiShell,
	Markdown: SiMarkdown,
};

const iconForLanguage = (language) => LANGUAGE_ICONS[language] || SiGithub;

const titleCase = (slug) =>
	slug
		.replace(/[-_]+/g, " ")
		.replace(/\s+/g, " ")
		.trim()
		.split(" ")
		.map((w) => (w ? w[0].toUpperCase() + w.slice(1) : w))
		.join(" ");

const synthesizeFeatures = ({ stars, forks }) => {
	const features = [];

	const starNum = Number(stars) || 0;
	const forkNum = Number(forks) || 0;
	if (starNum > 0 || forkNum > 0) {
		const parts = [];
		if (starNum > 0) parts.push(`${starNum} star${starNum === 1 ? "" : "s"}`);
		if (forkNum > 0) parts.push(`${forkNum} fork${forkNum === 1 ? "" : "s"}`);
		features.push(parts.join(" · "));
	}

	features.push("Pinned on my GitHub profile");
	features.push("Public, open-source repository");

	return features;
};

export const repoToProject = (repo) => {
	const owner = repo.owner || repo.author;
	const name = repo.repo || repo.name;
	const language = repo.language || null;
	const Icon = iconForLanguage(language);
	const themeColor = repo.languageColor || "#ffffff";

	return {
		title: titleCase(name || ""),
		repoName: name,
		url: repo.link || (owner && name ? `https://github.com/${owner}/${name}` : null),
		description: repo.description || `An open-source project on my GitHub profile.`,
		features: synthesizeFeatures({
			stars: repo.stars,
			forks: repo.forks,
		}),
		techStack: language
			? [{ name: language, icon: Icon, color: themeColor }]
			: [{ name: "GitHub", icon: SiGithub, color: "#ffffff" }],
		themeColor,
	};
};
