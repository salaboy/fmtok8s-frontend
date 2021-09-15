import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from 'contexts/AppContext';
import Header from 'components/Header/Header'
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
            ["page"]: true,
            ["about"]: true
          })}
    >
    <Header/>
      <section>

        <h1>About Us</h1>
        <p></p>
      </section>
    </div>
  </motion.div>
  )
}

export default About;
