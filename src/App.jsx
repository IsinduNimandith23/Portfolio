import "./App.css";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import Skills from "./components/skills";
import WorkExperience from "./components/workExperience";
import ContactMe from "./components/contactMe";
import Footer from "./components/footer";

function App() {
	return (
		<>
			<Navbar />
			<div className="container">
				<Hero />
				<Skills />
				<WorkExperience />
				<ContactMe />
			</div>
			<Footer />
		</>
	);
}

export default App;
