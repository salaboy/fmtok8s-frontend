import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import cn from 'classnames';
import Agenda from '../../components/Agenda/Agenda'

function FullAgenda() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  //scroll
  const { scroll } = useLocomotiveScroll();
  useEffect(() => {
    setCurrentSection("full-agenda");
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
            ["agenda"]: true
          })}
    >
<Header/>
      <section>

        <h1>Conference Agenda</h1>
        <br/>
        <h3>Monday's sessions</h3>
        <Agenda day="Monday"></Agenda>
        <h3>Tuesday's sessions</h3>
        <Agenda day="Tuesday"></Agenda>
      </section>
    </div>
  </motion.div>
  )
}

export default FullAgenda;
