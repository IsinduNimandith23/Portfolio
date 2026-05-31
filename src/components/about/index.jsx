import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import './styles.css';
import { useScrollReveal } from '../../utils/useScrollReveal';

const About = () => {
    const [contentRef, contentInView] = useScrollReveal();
    const [imagesRef, imagesInView] = useScrollReveal();

    return (
        <section id="about" className="about-container">
            <div
                ref={contentRef}
                className={`about-content reveal reveal-left ${contentInView ? 'in-view' : ''}`}
            >
                <span className="about-subtitle">A LITTLE ABOUT ME</span>
                <h2 className="about-title">Nice to meet you. I'm <span>Isindu</span></h2>

                <div className="about-text">
                    <p>
                        I transform complex ideas into high-speed, scalable web products. As an engineering-driven developer, I focus on the entire stack-prioritizing clean architecture, seamless performance, and modern solutions that drive real value.
                    </p>
                    <p>
                        Beyond writing code, I understand the product lifecycle. I've learned firsthand how to build, ship, and scale meaningful products in a fast-paced environment.
                    </p>
                    <p>
                        My philosophy is simple: build things that last. I help startups and businesses bridge the gap between concept and reality with code that performs.
                    </p>
                </div>

                <div className="about-socials">
                    <a
                        href="https://www.linkedin.com/in/isindu-nimandith-432228299/"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn"
                        className="social-link"
                    >
                        <FaLinkedinIn className="social-icon" />
                    </a>
                    <a
                        href="https://github.com/IsinduNimandith23"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub"
                        className="social-link"
                    >
                        <FaGithub className="social-icon" />
                    </a>
                </div>

                <a href="#projects" className="dive-deeper">
                    Dive in deeper <span className="arrow">→</span>
                </a>
            </div>

            <div
                ref={imagesRef}
                className={`about-images reveal reveal-right ${imagesInView ? 'in-view' : ''}`}
            >
                <div className="image-stack">
                    <img src="./assets/images/hero.jpeg" alt="Isindu Nimandith background" className="stack-img img-back" />
                    <img src="./assets/images/hero.jpeg" alt="Isindu Nimandith" className="stack-img img-front" />
                </div>
            </div>
        </section>
    );
};

export default About;
