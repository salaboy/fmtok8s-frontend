import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import cn from 'classnames';

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
      <section>

        <h1>About Us</h1>
        <p>You can find the links to the source code and tutorials by going to the main Github repository: <a href="https://github.com/salaboy/from-monolith-to-k8s">https://github.com/salaboy/from-monolith-to-k8s</a></p>
        <br/>
        <p>This application is fully covered by the <a href="http://mng.bz/jjKP">Continuous Delivery for Kubernetes Book</a></p>

        <img src="images/book.png"></img>
        <br/>
        <p>This application is currently being developed and maintained by: </p>
        <ul>
          <li>
            <img src="images/salaboy.png"></img>
            <a href="https://twitter.com/salaboy">Mauricio Salatino (Salaboy)</a>
          </li>
          <li>
            <img src="images/eze.png"></img>
            <a href="https://">Ezequiel Salatino</a>
          </li>
          <li>
            <img src="images/matheus.png"></img>
            <a href="https://twitter.com/mcruzdev1">Matheus Cruz</a>
          </li>
        </ul>
        <p>Do you want to contribute to make this application better?
          Go to the <a href="https://github.com/salaboy/from-monolith-to-k8s/issues">From Monolith To K8s repository</a> and create an issue or drop me a message in Twitter <a href="https://twitter.com/salaboy">@Salaboy</a> </p>
      </section>
    </div>
  </motion.div>
  )
}

export default About;
