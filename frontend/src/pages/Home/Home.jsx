import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Agenda from '../../components/Agenda/Agenda'
import Speakers from '../../components/Speakers/Speakers'
import Sponsors from '../../components/Sponsors/Sponsors'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Element from '../../components/Element/Element'
import Hero from '../../components/Hero/Hero'
import Button from '../../components/Button/Button'

import cn from 'classnames';

function Home() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  //scroll
  const { scroll } = useLocomotiveScroll();
  let debugEnabled = window._env_.FEATURE_DEBUG_ENABLED

  useEffect(() => {

    setCurrentSection("home");

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
            ["page"]: debugEnabled === 'false',
            ["page-debug"]: debugEnabled === 'true',
            ["home"]: true
          })}
    >

      <Header/>

      <Hero country="United Kingdom"/>

      <section>
        <Element>
          <h4>Agenda Highlights</h4>
          <Agenda highlights/>
          <Button link="/agenda">Check the full Conference Agenda here.</Button>
        </Element>
      </section>


      <section>
        <Element>
          <h4>Speakers</h4>
          <Speakers/>
          <Button link="/speakers">View all speakers</Button>
        </Element>
      </section>
      <section>
        <Element>
          <h4>Call for Proposals</h4>
          <p className="p p-b">Are you interested in presenting in this year edition, submit your proposals here. </p>
          <br/>
          <Element delay=".2">
            <Button main link="/proposals">Submit a Proposal</Button>
          </Element>
        </Element>
      </section>
      <section>
        <Element>
          <h4>Our Sponsors</h4>
          <Sponsors />
        </Element>
      </section>
      <Footer/>

    </div>
  </motion.div>
  )
}

export default Home;
