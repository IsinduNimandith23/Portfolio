import { MdArrowOutward } from "react-icons/md";
import { IoDocumentTextOutline } from "react-icons/io5";
import "./styles.css";
import { useScrollReveal } from "../../utils/useScrollReveal";

const Footer = () => {
    const [nameRef, nameInView] = useScrollReveal();
    const [contentRef, contentInView] = useScrollReveal({ threshold: 0.1 });

    return (
        <footer className="footer-container">
            <div className="footer-glow"></div>

            <div className="footer-max-wrapper">
                <h1
                    ref={nameRef}
                    className={`footer-name reveal reveal-up ${nameInView ? "in-view" : ""}`}
                >
                    ISINDU NIMANDITH
                </h1>

                <div
                    ref={contentRef}
                    className={`footer-content reveal reveal-up ${contentInView ? "in-view" : ""}`}
                >
                    {/* Column 1: Info */}
                    <div className="footer-col">
                        <div className="footer-info-block">
                            <span className="footer-label">Email</span>
                            <a href="mailto:isindunimandith23@gmail.com" className="footer-text hover-link">
                                isindunimandith23@gmail.com
                            </a>
                        </div>
                        <div className="footer-info-block">
                            <span className="footer-label">Location</span>
                            <span className="footer-text">Sri Lanka</span>
                        </div>
                    </div>

                    {/* Column 2: Socials */}
                    <div className="footer-col">
                        <div className="footer-info-block">
                            <span className="footer-label">Social</span>
                            <ul className="social-list">
                                <li>
                                    <a href="https://github.com/IsinduNimandith23" target="_blank" rel="noreferrer" className="footer-link">
                                        GitHub <MdArrowOutward className="social-arrow" />
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/isindu-nimandith-432228299/" target="_blank" rel="noreferrer" className="footer-link">
                                        LinkedIn <MdArrowOutward className="social-arrow" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="footer-link">
                                        Twitter <MdArrowOutward className="social-arrow" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="footer-link">
                                        Facebook <MdArrowOutward className="social-arrow" />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="footer-link">
                                        Instagram <MdArrowOutward className="social-arrow" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Column 3: Credits */}
                    <div className="footer-col footer-credits">
                        <div className="footer-info-block">
                            <p className="credit-text">
                                Designed and Developed<br />
                                by <span className="highlight">Isindu Nimandith</span>
                            </p>
                            <p className="copyright">
                                © {new Date().getFullYear()}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="footer-resume-btn">
                    <a href="#">RESUME <IoDocumentTextOutline className="resume-icon" /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
