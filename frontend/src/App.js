import React, {useEffect, useState, useContext, useRef} from "react";
import {Switch, Route, useLocation, useHistory} from "react-router-dom";
import {LocomotiveScrollProvider} from 'react-locomotive-scroll';
import {AnimatePresence} from "framer-motion";
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Speakers from './pages/Speakers/Speakers';
import Proposals from './pages/Proposals/Proposals';
import FullAgenda from './pages/FullAgenda/FullAgenda';
import Tickets from './pages/Tickets/Tickets';
import BackOffice from './pages/BackOffice/BackOffice';
import Nav from './components/Nav/Nav';
import AppContext from './contexts/AppContext';
import cn from 'classnames';

function App() {
    const location = useLocation();
    const containerRef = useRef(null);


    //contexts
    const [currentSection, setCurrentSection] = useState("home");
    //
    return (


        <AppContext.Provider value={{
            setCurrentSection: setCurrentSection,
            currentSection: currentSection,
        }}>
            <LocomotiveScrollProvider
                options={{
                    smooth: true,
                    reloadOnContextChange: false,
                }}
                watch={[]}
                containerRef={containerRef}
            >
                <div className={cn({
                    ["App"]: true,
                })}>
                    <Nav/>
                    <main data-scroll-container ref={containerRef}>
                        <AnimatePresence exitBeforeEnter>
                            <Switch location={location} key={location.pathname}>

                                <Route path="/" exact>
                                    <Home/>
                                </Route>
                                <Route path="/agenda-page" exact>
                                    <FullAgenda/>
                                </Route>
                                <Route path="/proposals-page" exact>
                                    <Proposals/>
                                </Route>
                                <Route path="/speakers-page" exact>
                                    <Speakers/>
                                </Route>
                                <Route path="/tickets-page" exact>
                                    <Tickets/>
                                </Route>
                                <Route path="/about-page" exact>
                                    <About/>
                                </Route>

                                <Route path="/back-office-page/:subSection" >
                                    <BackOffice/>
                                </Route>
                                <Route path="/back-office-page" exact >
                                    <BackOffice/>
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
