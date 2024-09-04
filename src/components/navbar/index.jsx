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
				<div className="nav-content">
					<img className="logo" src="./assets/images/logo.png" alt="logo" />
					<ul>
						<li>
							<a className="menu-item" onClick={() => scrollToSection("home")}>
								Home
							</a>
						</li>
						<li>
							<a
								className="menu-item"
								onClick={() => scrollToSection("skills")}>
								Skills
							</a>
						</li>
						<li>
							<a
								className="menu-item"
								onClick={() => scrollToSection("projects")}>
								Projects
							</a>
						</li>
						<li>
							<a
								className="menu-item"
								onClick={() => scrollToSection("contact")}>
								Contact Me
							</a>
						</li>
					</ul>
					<button
						className="contact-btn"
						onClick={() => {
							const email = "isindunimandith23@gmail.com";
							const subject = "Hire Me";
							const body =
								"Hello, I would like to hire you for a project. Please get back to me with more information.";
							const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
								subject || ""
							)}&body=${encodeURIComponent(body || "")}`;
							window.location.href = mailtoLink;
						}}>
						Hire Me
					</button>
					<button className="menu-btn" onClick={toggleMenu}>
						<span
							className={"material-symbols-outlined"}
							style={{ fontSize: "1.8rem" }}>
							{openMenu ? "close" : "menu"}
						</span>
					</button>
				</div>
			</nav>
		</>
	);
};

export default Navbar;