import "./styles.css";
import PropTypes from "prop-types";

const ContactInfoCard = ({ iconUrl, text, link }) => {
	return (
		<a
			href={link}
			target="_blank"
			rel="noopener noreferrer"
			className="contact-details-card">
			<div className="icon">
				<img src={iconUrl} alt={text} />
			</div>
			<p>{text}</p>
		</a>
	);
};

ContactInfoCard.propTypes = {
	iconUrl: PropTypes.string.isRequired,
	text: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

export default ContactInfoCard;
