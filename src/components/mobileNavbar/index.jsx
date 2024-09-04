import "./styles.css";

// eslint-disable-next-line react/prop-types
const MobileNav = ({ isOpen, toggleMenu }) => {
	return (
		<div
			className={`mobile-menu ${isOpen ? "active" : ""}`}
			onClick={toggleMenu}>
			<div className="mobile-menu-container">
				<img className="logo" src="./assets/images/logo.png" alt="" />

				<ul>
					<li>
						<a className="menu-item" href="#">
							Home
						</a>
					</li>
					<li>
						<a className="menu-item" href="#">
							Skills
						</a>
					</li>
					<li>
						<a className="menu-item" href="#">
							Projects
						</a>
					</li>
					<li>
						<a className="menu-item" href="#">
							Contact Me
						</a>
					</li>
				</ul>

				<button className="contact-btn" onClick={() => {}}>
					Hire Me
				</button>
			</div>
		</div>
	);
};

export default MobileNav;
