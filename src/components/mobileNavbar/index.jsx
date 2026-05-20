import "./styles.css";

const NAV_ITEMS = [
	{ id: "home", label: "Home" },
	{ id: "about", label: "About" },
	{ id: "skills", label: "Skills" },
	{ id: "projects", label: "Projects" },
];

// eslint-disable-next-line react/prop-types
const MobileNav = ({ isOpen, toggleMenu }) => {
	const handleNavClick = (e, sectionId) => {
		e.preventDefault();
		const target = document.getElementById(sectionId);
		if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
		toggleMenu();
	};

	const handleHire = () => {
		const email = "isindunimandith23@gmail.com";
		window.location.href = `mailto:${email}?subject=${encodeURIComponent("Hire Me")}`;
		toggleMenu();
	};

	const stopPropagation = (e) => e.stopPropagation();

	return (
		<div
			className={`mobile-menu ${isOpen ? "active" : ""}`}
			onClick={toggleMenu}>
			<div className="mobile-menu-container" onClick={stopPropagation}>
				<img className="logo" src="./assets/images/logo.png" alt="" />

				<ul>
					{NAV_ITEMS.map((item) => (
						<li key={item.id}>
							<a
								className="menu-item"
								href={`#${item.id}`}
								onClick={(e) => handleNavClick(e, item.id)}>
								{item.label}
							</a>
						</li>
					))}
				</ul>

				<button className="contact-btn" onClick={handleHire}>
					Hire Me
				</button>
			</div>
		</div>
	);
};

export default MobileNav;
