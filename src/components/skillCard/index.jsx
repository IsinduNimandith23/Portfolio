import './styles.css';
import PropTypes from 'prop-types';

const SkillCard = ({ title, iconURL, isActive, onClick }) => {
    return (
        <div className={`skills-card ${isActive ? "active" : ""}`} onClick={onClick}>
            
            <div className='skill-icon'>
                <img src={iconURL} alt={title} />
            </div>

            <span>{title}</span>
        </div>
    );
};

SkillCard.propTypes = {
    title: PropTypes.string.isRequired,
    iconURL: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired
};


export default SkillCard;
