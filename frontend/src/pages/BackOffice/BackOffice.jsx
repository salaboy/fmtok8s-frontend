import React, { useEffect, useState, useContext, useRef } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from 'contexts/AppContext';
import Header from 'components/Header/Header'
import Footer from 'components/Footer/Footer'
import cn from 'classnames';
import ProposalList from "components/ProposalList/ProposalList";
import SectionHero from 'components/SectionHero/SectionHero'
import TicketsQueue from "../../components/TicketsQueue/TicketsQueue";

function BackOffice() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  //scroll
  const { scroll } = useLocomotiveScroll();
  useEffect(() => {
    setCurrentSection("back-office");
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
            ["back-office"]: true
          })}
    >
      <Header/>
      <SectionHero small title="Welcome Conference Organizers" />
      <section>
        <h4>Proposals to Review </h4>
        <ProposalList></ProposalList>
      </section>
      <section>
        <h4>Tickets Queue</h4>
        <TicketsQueue></TicketsQueue>
      </section>
      <Footer/>
    </div>
  </motion.div>
  )
}

export default BackOffice;
