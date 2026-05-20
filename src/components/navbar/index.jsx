import { useState } from "react";

import "./styles.css";
import MobileNav from "./../mobileNavbar";

const Navbar = () => {
	const [openMenu, setOpenMenu] = useState(false);

	const toggleMenu = () => {
		setOpenMenu(!openMenu);
	};

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({ behavior: "smooth", block: "start" });
		}
		setOpenMenu(false);
	};

	return (
		<>
			<MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />
			<nav className="nav-wrapper">
				<div className="nav-container">
					<div className="nav-logo-area">
						<img className="logo-small" src="./assets/images/logo.png" alt="logo" />
					</div>

					<div className="nav-pill">
						<ul>
							<li>
								<a className="menu-item" onClick={() => scrollToSection("home")}>
									Home
								</a>
							</li>
							<li>
								<a className="menu-item" onClick={() => scrollToSection("about")}>
									About
								</a>
							</li>
							<li>
								<a className="menu-item" onClick={() => scrollToSection("skills")}>
									Skills
								</a>
							</li>
							<li>
								<a className="menu-item" onClick={() => scrollToSection("projects")}>
									Projects
								</a>
							</li>
						</ul>

						<div className="nav-divider"></div>

						<button className="theme-toggle">
							<span className="material-symbols-outlined" style={{ fontSize: "1.2rem" }}>dark_mode</span>
						</button>

						<button
							className="contact-btn"
							onClick={() => {
								window.location.href = "tel:+94770372960";
							}}>
							<span>Book a Call</span>
						</button>
					</div>

					<div className="nav-action-area">
						<button className="menu-btn" onClick={toggleMenu}>
							<span
								className={"material-symbols-outlined"}
								style={{ fontSize: "1.5rem" }}>
								{openMenu ? "close" : "menu"}
							</span>
						</button>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Navbar;