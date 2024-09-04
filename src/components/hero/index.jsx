import './styles.css'

const Hero = () => {
  return (
    <section id='home' className='hero-container'>
        <div className='hero-content'>
            <h2>Building Digital Experience That Inspire</h2>
            <p>
                Passinate Frontend Developer | Transforming Ideas into Seamless and Visually Stunning Web Solutions
            </p>
        </div>

        <div className='hero-img'>
            <div>
                <div className='tech-icon'>
                    <img src="./assets/images/react.png" alt="" />
                </div>
                    <img src="./assets/images/hero.jpg" alt="" />
                </div>

                <div>
                    <div className='tech-icon'>
                        <img src="./assets/images/html.png" alt="" />
                    </div>
                    <div className='tech-icon'>
                        <img src="./assets/images/css.png" alt="" />
                    </div>
                    <div className='tech-icon'>
                        <img src="./assets/images/js.png" alt="" />
                    </div>
                </div>
            </div>
    </section>
  )
}

export default Hero