import React, { useEffect, useState, useContext, useRef } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import { AnimatePresence } from "framer-motion";
import Home from 'pages/Home/Home';
import About from 'pages/About/About';
import Speakers from 'pages/Speakers/Speakers';
import Proposals from 'pages/Proposals/Proposals';
import FullAgenda from 'pages/FullAgenda/FullAgenda';

import BackOffice from 'pages/BackOffice/BackOffice';
import Nav from 'components/Nav/Nav';
import AppContext from 'contexts/AppContext';
import cn from 'classnames';


function App() {
  const location = useLocation();
  const containerRef = useRef(null);
  //contexts
  const [currentSection, setCurrentSection] = useState("home");
  const [agendaItems, setAgendaItems] = useState("")
  //
  return (


          <AppContext.Provider value={{
              setCurrentSection: setCurrentSection,
              currentSection : currentSection,
           }}>
          <LocomotiveScrollProvider
            options={{
                smooth: true,
                reloadOnContextChange: false,
            }}
            watch={[] }
            containerRef={containerRef}
          >
            <div  className =  {  cn({
                ["App"]: true,
              })}>
              <Nav />
              <main data-scroll-container ref={containerRef}>
                <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname} >

                    <Route path="/" exact>
                      <Home />
                    </Route>
                    <Route path="/agenda" exact>
                      <FullAgenda />
                    </Route>
                    <Route path="/proposals" exact>
                      <Proposals />
                    </Route>
                    <Route path="/speakers" exact>
                      <Speakers />
                    </Route>

                    <Route path="/about" exact>
                      <About />
                    </Route>

                    <Route path="/back-office" exact>
                      <BackOffice />
                    </Route>


                  </Switch>
                </AnimatePresence>
              </main>
            </div>
          </LocomotiveScrollProvider>
        </AppContext.Provider>

  );
}

export default App;
