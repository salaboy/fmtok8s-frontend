import React, { useEffect, useContext, Suspense, lazy  } from "react";
import { motion } from "framer-motion"
import { useLocomotiveScroll } from 'react-locomotive-scroll';
import AppContext from '../../contexts/AppContext';
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import cn from 'classnames';
import SectionHero from '../../components/SectionHero/SectionHero'
import BackOfficeNav from "../../components/BackOfficeNav/BackOfficeNav";
import { useParams } from "react-router-dom";
import FeatureFlags from "../../components/FeatureFlags/FeatureFlags";




function BackOffice() {
  const {  currentSection, setCurrentSection } = useContext(AppContext);
  let { subSection } = useParams();
  //scroll
  const { scroll } = useLocomotiveScroll();

  let ticketsEnabled = window._env_.FEATURE_TICKETS_ENABLED
  let c4pEnabled = window._env_.FEATURE_C4P_ENABLED
  let speakersEnabled = window._env_.FEATURE_SPEAKERS_ENABLED

  const TicketsFeature = React.useMemo( () => lazy(() => import('../../components/TicketsQueue/TicketsQueue')), []);
  // const ticketsFeature = props => <TicketsQueue {...props} />;

  const ProposalsFeature = React.useMemo( () => lazy(() => import('../../components/ProposalList/ProposalList')), []);
  // const proposalsFeature = props => <ProposalList {...props} />;

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
            ["back-office"]: true
          })}
    >
      <Header/>
      <SectionHero border small title="Welcome Conference Organizers" />
      <section className="back-office__Layout">

        <div className="back-office__Layout__Nav">
          <BackOfficeNav currentSubSection={subSection}/>
        </div>
        <div className="back-office__Layout__Content">
            {(subSection === "proposals" && c4pEnabled) &&
              <>
                <h4>Proposals to Review </h4>
                <Suspense fallback='<div>Loading...</div>'>
                  <ProposalsFeature></ProposalsFeature>
                </Suspense>
              </>
            }
          {(subSection === "features" || subSection === undefined) && (
              <>
                <h4>Feature Flags</h4>
                <FeatureFlags></FeatureFlags>
              </>
          )}
            {subSection === "tickets" && ticketsEnabled && (
              <>
              <h2>Tickets Queue Admin</h2>
              <Suspense fallback='<div>Loading...</div>'>
                <TicketsFeature></TicketsFeature>
              </Suspense>
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
