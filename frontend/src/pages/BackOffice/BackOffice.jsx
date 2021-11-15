import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import cn from 'classnames';
import ProposalList from "../../components/ProposalList/ProposalList";
import SectionHero from '../../components/SectionHero/SectionHero'
import TicketsQueue from "../../components/TicketsQueue/TicketsQueue";
import BackOfficeNav from "../../components/BackOfficeNav/BackOfficeNav";
import { useParams } from "react-router-dom";

function BackOffice() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  let { subSection } = useParams();
  //scroll
  const { scroll } = useLocomotiveScroll();
  useEffect(() => {
    setCurrentSection("back-office");
    if(scroll){
      scroll.destroy();
      scroll.init();
      if(subSection){
        scroll.scrollTo(".back-office__Layout", { duration:0 , disableLerp: true})
      }
    }
  }, [scroll]);

  //Handle advanced page transitions
  const pageVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 1 },
    exit: { opacity: 1 , transition:{ duration: .2}}
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
            ["back-office"]: true
          })}
    >
      <Header/>
      <SectionHero  title="Welcome Conference Organizers" />
      <h1>{process.env.TICKETS_ENABLED}</h1>

      <section className="back-office__Layout">

        <div className="back-office__Layout__Nav">
          <BackOfficeNav currentSubSection={subSection}/>
        </div>
        <div className="back-office__Layout__Content">
            {(subSection === "proposals" || subSection === undefined) && (
              <>
                <h2>Proposals to Review </h2>
                <ProposalList></ProposalList>
              </>
            )}
            {subSection === "tickets" && (
              <>
              <h2>Tickets Queue Admin</h2>
              <TicketsQueue></TicketsQueue>
              </>
            )}



        </div>
      </section>

      <Footer/>
    </div>
  </motion.div>
  )
}

export default BackOffice;
