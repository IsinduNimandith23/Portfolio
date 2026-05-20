import "./App.css";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Marquee from "./components/marquee";
import About from "./components/about";
import Skills from "./components/skills";
import WorkExperience from "./components/workExperience";
import ContactMe from "./components/contactMe";
import Footer from "./components/footer";

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Marquee />
			<div className="container">
				<About />
			</div>
			<div className="section-divider"></div>
			<Skills />
			<div className="container">
				<WorkExperience />
				<ContactMe />
			</div>
			<Footer />
		</>
	);
}

export default App;
