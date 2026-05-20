import "./styles.css";
import ContactInfoCard from "./../contactInfoCard";
import ContactForm from "./../contactForm";
import { useScrollReveal } from "../../utils/useScrollReveal";

const ContactMe = () => {
  const [titleRef, titleInView] = useScrollReveal();
  const [infoRef, infoInView] = useScrollReveal();
  const [formRef, formInView] = useScrollReveal();

  return (
    <section id="contact" className="contact-container">
      <h5
        ref={titleRef}
        className={`reveal reveal-up ${titleInView ? "in-view" : ""}`}
      >
        Contact <span>Me</span>
      </h5>

      <div className="contact-content">
        <div
          ref={infoRef}
          style={{ flex: 1 }}
          className={`reveal reveal-left ${infoInView ? "in-view" : ""}`}
        >
          <ContactInfoCard
            iconUrl="./assets/images/linkedin.png"
            text="LinkedIn"
            link="https://www.linkedin.com/in/isindu-nimandith-432228299/"
          />
          <ContactInfoCard
            iconUrl="./assets/images/github.png"
            text="Github"
            link="https://github.com/IsinduNimandith23"
          />
        </div>
        <div
          ref={formRef}
          style={{ flex: 1 }}
          className={`reveal reveal-right ${formInView ? "in-view" : ""}`}
        >
          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
