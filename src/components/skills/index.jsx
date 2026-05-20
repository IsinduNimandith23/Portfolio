import "./styles.css";
import { TECH_STACK } from "../../utils/data";
import { useScrollReveal } from "../../utils/useScrollReveal";

const Skills = () => {
    const [headingRef, headingInView] = useScrollReveal();
    const [gridRef, gridInView] = useScrollReveal({ threshold: 0.1 });

    return (
        <section id="skills" className="skills-container">
            <div className="skills-bg-elements">
                <div className="skills-bg-grid"></div>
                <div className="skills-bg-glow"></div>
            </div>

            <h2
                ref={headingRef}
                className={`skills-heading reveal reveal-up ${headingInView ? 'in-view' : ''}`}
            >
                TECH STACK
            </h2>

            <div
                ref={gridRef}
                className={`tech-stack-wrapper ${gridInView ? 'is-visible' : ''}`}
            >
                {TECH_STACK.map((item, idx) => (
                    <div
                        className="tech-card"
                        key={item.skill}
                        style={{
                            "--tech-color": item.color || "var(--accent-primary)",
                            "--stagger": `${idx * 40}ms`,
                        }}
                    >
                        <div className="tech-card-inner-glow"></div>
                        <item.icon className="tech-card-icon" />
                        <span className="tech-card-name">{item.skill}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Skills;