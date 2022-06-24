import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import cn from 'classnames';
import Button from '../../components/Button/Button'
import BookImage from '../../images/book.png'
import SalaboyImage from '../../images/salaboy.png'
import MatheusImage from '../../images/matheus.jpg'
import EzeImage from '../../images/esala.png'
import Speaker from '../../components/Speaker/Speaker'

function About() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  //scroll
  const { scroll } = useLocomotiveScroll();
  useEffect(() => {
    setCurrentSection("about");
    if(scroll){
      scroll.destroy();
      scroll.init();
    }
  }, [scroll]);
  //Handle advanced page transitions
  const pageVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
    exit: { opacity: 0 , transition:{ duration: .5}}
  }
  const pageAnimationStart = e => {
  };
  const pageAnimationComplete = e => {
  };

  let debugEnabled = window._env_.FEATURE_DEBUG_ENABLED


  return (
  <motion.div
    exit="exit"
    animate="visible"
    initial="hidden"
    variants={pageVariants}
    onAnimationStart={pageAnimationStart}
    onAnimationComplete={pageAnimationComplete}
  >

    <div className={  cn({
            ["page"]: debugEnabled === 'false',
            ["page-debug"]: debugEnabled === 'true',
            ["about"]: true
          })}
    >
    <Header/>
      <section className="section ">
        <h1>About Us</h1>
        <div className="grid">
          <div>
            <h4>Repository</h4>
            <p>You can find the links to the source code and tutorials by going to the main Github repository: <a href="https://github.com/salaboy/from-monolith-to-k8s">https://github.com/salaboy/from-monolith-to-k8s</a></p>
            <br/>
            <Button main external link="https://github.com/salaboy/from-monolith-to-k8s">Go to the repository</Button>
          </div>
          <div>
            <h4>Book</h4>
            <div className="grid">
            <div>
              <p>This application is fully covered by the <a target="_blank" href="http://mng.bz/jjKP">Continuous Delivery for Kubernetes Book</a>.</p>
            </div>
            <div>
              <img src={BookImage} height="200"></img>
            </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section white ">
        <div className="grid">
          <div>
            <h4>Developed and maintained by</h4>

            <Speaker
              name={"Mauricio Salatino (Salaboy)"}
              position={<a target="_blank" href="https://twitter.com/salaboy">Twitter: @salaboy</a>}
              authorImage={SalaboyImage}
              externalImage={true}
              small

            />
            <Speaker
              name={"Ezequiel Salatino"}
              position={<a target="_blank" href="https://salatino.me">Webstite: salatino.me</a>}
              authorImage={EzeImage}
              externalImage={true}
              small

            />
            <Speaker
              name={"Matheus Cruz"}
              position={<a target="_blank" href="https://twitter.com/mcruzdev1">Twitter: @mcruzdev1</a>}
              authorImage={MatheusImage}
              externalImage={true}
              small

            />

          </div>
          <div>
          <h4>Contribute</h4>
            <p className="p p-b">Do you want to contribute to make this application better?
            Go to the <a href="https://github.com/salaboy/from-monolith-to-k8s/issues">From Monolith To K8s repository</a> and create an issue or drop me a message in Twitter <a href="https://twitter.com/salaboy">@Salaboy</a> </p>
            <br/>
            <Button  external link="https://twitter.com/salaboy">Drop me a message</Button>
          </div>
        </div>
      </section>
      <section className="section  yellow nopadding">
        <Footer/>
      </section>
    </div>
  </motion.div>
  )
}

export default About;
