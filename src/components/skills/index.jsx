import { useState } from "react";

import "./styles.css";
import { SKILLS } from "../../utils/data";
import SkillCard from "./../skillCard";
import SkillsInfoCard from "./../skillInfoCard";

const Skills = () => {
	const [selectedSkill, setSelectedSkill] = useState(SKILLS[0]);

	const handleSelectSkill = (data) => {
		setSelectedSkill(data);
	};

	return (
		<section id="skills" className="skills-container">
			<h5>Technincal Proficiency</h5>

			<div className="skills-content">
				<div className="skills">
					{SKILLS.map((item) => (
						<SkillCard
							key={item.title}
							iconURL={item.icon}
							title={item.title}
							isActive={selectedSkill.title === item.title}
							onClick={() => handleSelectSkill(item)}
						/>
					))}
				</div>

				<div className="skills-info">
					<SkillsInfoCard
						heading={selectedSkill.title}
						skills={selectedSkill.skills}
					/>
				</div>
			</div>
		</section>
	);
};

export default Skills;