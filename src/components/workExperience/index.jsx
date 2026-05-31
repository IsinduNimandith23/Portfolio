import { useState, useRef, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { useGithubPinned } from "../../utils/useGithubPinned";
import { repoToProject } from "../../utils/githubProject";
import { screenshotForRepo } from "../../utils/projectScreenshots";
import { useScrollReveal } from "../../utils/useScrollReveal";
import "./styles.css";

const GITHUB_USERNAME = "IsinduNimandith23";

const ProjectDetails = ({ project, className = "", nested = false }) => (
    <div className={`project-details ${className}`}>
        <h3 className="project-title" style={{ color: project.themeColor }}>
            <span className="dash">-</span> {project.title}
        </h3>
        <p className="project-desc">🚀 {project.description}</p>
        <ul className="project-features">
            {project.features.map((feature, idx) => (
                <li key={idx}>
                    <span className="sparkle" style={{ color: project.themeColor }}>✦</span>
                    {feature}
                </li>
            ))}
        </ul>

        <div className="project-tech-stack">
            {project.techStack.map((Tech, idx) => (
                <div className="tech-badge" key={idx} style={{ "--tech-color": Tech.color || "var(--accent-primary)" }}>
                    {Tech.icon && <Tech.icon className="badge-icon" />}
                    <span>{Tech.name}</span>
                </div>
            ))}
        </div>

        {/* When `nested`, this renders inside an <a> card wrapper, so the CTA must
            not be an anchor (invalid <a>-in-<a> nesting). Use a role="link" span. */}
        {project.url && (
            nested ? (
                <span
                    className="project-cta"
                    role="link"
                    tabIndex={0}
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        window.open(project.url, "_blank", "noopener,noreferrer");
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            e.stopPropagation();
                            e.preventDefault();
                            window.open(project.url, "_blank", "noopener,noreferrer");
                        }
                    }}
                    style={{ borderColor: project.themeColor }}
                >
                    View on GitHub →
                </span>
            ) : (
                <a
                    className="project-cta"
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ borderColor: project.themeColor }}
                >
                    View on GitHub →
                </a>
            )
        )}
    </div>
);

ProjectDetails.propTypes = {
    project: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        techStack: PropTypes.array.isRequired,
        themeColor: PropTypes.string,
        url: PropTypes.string,
        liveUrl: PropTypes.string,
    }).isRequired,
    className: PropTypes.string,
    nested: PropTypes.bool,
};

const WorkExperience = () => {
    const { repos, loading, error } = useGithubPinned(GITHUB_USERNAME);
    const projects = useMemo(() => repos.map(repoToProject), [repos]);

    const [activeIndex, setActiveIndex] = useState(0);
    const [scrollProgress, setScrollProgress] = useState(0);
    const rightSideRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (projects.length === 0) return undefined;

        const handleScroll = () => {
            if (!rightSideRef.current || !containerRef.current) return;

            const elements = rightSideRef.current.querySelectorAll('.project-right-card');
            if (!elements || elements.length === 0) return;

            const viewportMiddle = window.innerHeight / 2;

            let minDistance = Infinity;
            let idx = 0;

            elements.forEach((el, i) => {
                const rect = el.getBoundingClientRect();
                const elMiddle = rect.top + rect.height / 2;
                const distance = Math.abs(viewportMiddle - elMiddle);
                if (distance < minDistance) {
                    minDistance = distance;
                    idx = i;
                }
            });

            setActiveIndex((prev) => (prev === idx ? prev : idx));

            const firstCard = elements[0].getBoundingClientRect();
            const lastCard = elements[elements.length - 1].getBoundingClientRect();

            const startY = firstCard.top + firstCard.height / 2;
            const endY = lastCard.top + lastCard.height / 2;
            const totalDistance = endY - startY;

            let progress = 0;
            if (totalDistance > 0) {
                progress = (viewportMiddle - startY) / totalDistance;
            }

            progress = Math.max(0, Math.min(1, progress));
            setScrollProgress((prev) => {
                const next = progress * 100;
                return Math.abs(prev - next) < 0.5 ? prev : next;
            });
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, [projects.length]);

    useEffect(() => {
        if (activeIndex >= projects.length && projects.length > 0) {
            setActiveIndex(0);
        }
    }, [projects.length, activeIndex]);

    const activeProject = projects[activeIndex];

    const [headerRef, headerInView] = useScrollReveal();

    return (
        <section id="projects" className="projects-showcase" ref={containerRef}>
            <div
                ref={headerRef}
                className={`projects-header reveal reveal-up ${headerInView ? 'in-view' : ''}`}
            >
                <span className="subtitle">CRAFTING MODERN EXPERIENCES</span>
                <h2>MY <span>WORK</span></h2>
            </div>

            {loading && (
                <div className="projects-status">Loading pinned projects from GitHub…</div>
            )}

            {!loading && error && (
                <div className="projects-status projects-status-error">
                    Could not load pinned repos right now. Please check back soon.
                </div>
            )}

            {!loading && !error && projects.length === 0 && (
                <div className="projects-status">
                    No pinned repositories found on{" "}
                    <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noreferrer">
                        @{GITHUB_USERNAME}
                    </a>
                    . Pin some on GitHub to populate this section.
                </div>
            )}

            {projects.length > 0 && activeProject && (
                <div className="projects-layout">
                    {/* Left Side: Sticky Details (desktop only) */}
                    <div className="projects-left">
                        <div className="left-sticky-content">
                            <ProjectDetails project={activeProject} />
                        </div>
                    </div>

                    {/* Middle Track: Animation line (desktop only) */}
                    <div className="projects-middle-track">
                        <div className="track-line">
                            <div
                                className="track-progress"
                                style={{
                                    height: `${scrollProgress}%`,
                                    backgroundColor: activeProject.themeColor
                                }}
                            ></div>
                            <div
                                className="track-indicator"
                                style={{
                                    top: `${scrollProgress}%`,
                                    borderColor: activeProject.themeColor
                                }}
                            >
                                <img src="./assets/images/logo.png" alt="indicator" className="indicator-img" />
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Scrolling Cards */}
                    <div className="projects-right" ref={rightSideRef}>
                        {projects.map((project, idx) => {
                            const githubCard = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${project.repoName}`;
                            // Prefer a real homepage screenshot; fall back to GitHub's social card.
                            const previewImage = screenshotForRepo(project.repoName) || githubCard;

                            // Prefer the live/hosted site (GitHub "Website" field); fall back to the repo.
                            const cardUrl = project.liveUrl || project.url;
                            const CardWrapper = cardUrl ? "a" : "div";
                            const wrapperProps = cardUrl
                                ? { href: cardUrl, target: "_blank", rel: "noreferrer" }
                                : {};

                            return (
                                <CardWrapper
                                    {...wrapperProps}
                                    className={`project-right-card ${activeIndex === idx ? 'focused' : 'blurred'}`}
                                    key={project.repoName || project.title}
                                >
                                    <div className="project-card-media">
                                        <img
                                            className="project-card-media-backdrop"
                                            src={previewImage}
                                            alt=""
                                            aria-hidden="true"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                            }}
                                        />
                                        <img
                                            className="project-card-media-photo"
                                            src={previewImage}
                                            alt={`${project.title} preview`}
                                            loading="lazy"
                                            onError={(e) => {
                                                e.currentTarget.style.display = "none";
                                                e.currentTarget.parentElement?.classList.add("media-fallback");
                                            }}
                                        />
                                        <span className="project-card-media-fallback">
                                            {project.title}
                                        </span>
                                    </div>

                                    <div className="project-card-meta">
                                        <span className="project-card-index">
                                            {String(idx + 1).padStart(2, "0")}
                                            <span className="project-card-index-total">
                                                {" / "}{String(projects.length).padStart(2, "0")}
                                            </span>
                                        </span>
                                        <span className="project-card-repo">
                                            {GITHUB_USERNAME}/{project.repoName}
                                        </span>
                                        {cardUrl && (
                                            <span className="project-card-cta">
                                                View project <span aria-hidden="true">→</span>
                                            </span>
                                        )}
                                    </div>

                                    {/* Mobile-only inline details. `nested` because this
                                        sits inside the (possibly <a>) card wrapper. */}
                                    <ProjectDetails
                                        project={project}
                                        className="project-details-mobile"
                                        nested={CardWrapper === "a"}
                                    />
                                </CardWrapper>
                            );
                        })}
                    </div>
                </div>
            )}
        </section>
    );
};

export default WorkExperience;
