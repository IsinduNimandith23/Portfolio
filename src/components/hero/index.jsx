import { useEffect, useRef } from 'react';
import './styles.css'

const Hero = () => {
    const bgRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!bgRef.current) return;
            const x = (window.innerWidth / 2 - e.clientX) / 20;
            const y = (window.innerHeight / 2 - e.clientY) / 20;
            
            bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <section id='home' className='hero-container'>
            <div className='hero-bg'>
                <img 
                    ref={bgRef}
                    src="./assets/images/me.transparent.png" 
                    alt="Isindu Nimandith Background" 
                    className="hero-bg-img" 
                />
                <div className="hero-bg-overlay"></div>
            </div>

            <div className='hero-content'>
                <h1 className='hero-name'>ISINDU <span>NIMANDITH</span></h1>
                <h2>Building Digital Experiences That Inspire</h2>
                <p>
                    Passionate Full Stack Developer | Transforming Ideas into Seamless and Visually Stunning Web Solutions
                </p>

                <div className='hero-tech-stack'>
                    <div className='tech-icon'>
                        <img src="./assets/images/react.png" alt="React" />
                    </div>
                    <div className='tech-icon'>
                        <img src="./assets/images/js.png" alt="JavaScript" />
                    </div>
                    <div className='tech-icon'>
                        <img src="./assets/images/css.png" alt="CSS" />
                    </div>
                    <div className='tech-icon'>
                        <img src="./assets/images/html.png" alt="HTML" />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero