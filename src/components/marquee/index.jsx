import "./styles.css";

const MARQUEE_ITEMS = [
    "Available for Work",
    "Frontend Engineer",
    "Full-Stack Developer",
    "React · Next.js",
    "Design-Driven Code",
    "Based in Sri Lanka",
    "Open to Collaboration",
];

const MarqueeGroup = ({ ariaHidden = false }) => (
    <div className="marquee-group" aria-hidden={ariaHidden}>
        {MARQUEE_ITEMS.map((item, i) => (
            <div className="marquee-item" key={i}>
                <span className="marquee-text">{item}</span>
                <span className="marquee-divider">✦</span>
            </div>
        ))}
    </div>
);

const Marquee = () => (
    <div className="marquee-strip">
        <div className="marquee-track">
            <MarqueeGroup />
            <MarqueeGroup ariaHidden />
        </div>
    </div>
);

export default Marquee;
