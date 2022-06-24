import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import SectionHero from '../../components/SectionHero/SectionHero'
import Footer from '../../components/Footer/Footer'
import cn from 'classnames';
import ProposalForm from '../../components/ProposalForm/ProposalForm'

function Proposals() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);

  //scroll
  const { scroll } = useLocomotiveScroll();
  useEffect(() => {
    setCurrentSection("proposals");
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
            ["proposals"]: true
          })}
    >
      <Header/>
      <SectionHero title="Join us as a speaker" />
      <section data-scroll id="fixed-target">


        <div  className="proposals__body">
          <div className="proposals__form">
            <ProposalForm />
          </div>
          <div className="proposals__info" data-scroll data-scroll-sticky data-scroll-target="#fixed-target" data-scroll-speed="2">
            <p data-scroll data-scroll-speed="2" className="p p-b">Are you passionate about Cloud, Kubernetes, Docker or other technologies related with the Cloud. Submit your proposal to share your knowledge with our amazing community!</p>
          </div>
        </div>

      </section>
      <Footer/>
    </div>
  </motion.div>
  )
}

export default Proposals;
