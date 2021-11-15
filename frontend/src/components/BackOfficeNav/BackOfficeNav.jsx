import "./BackOfficeNav.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from '../../contexts/AppContext';
import cn from 'classnames';

function BackOfficeNav({currentSubSection}) {
  const {  currentSection } = useContext(AppContext);



    return (
      <div className={  cn({
          ["BackOfficeNav"]: true,
          ["--backoffice"]: currentSection === "back-office",
        })}>
        <div className="BackOfficeNav__container">



              <div>
                <NavLink
                  className={ cn({
                    ["--default"]: !currentSubSection,
                  })}
                  activeClassName='--active' to='/back-office/proposals' exact> Proposals
                </NavLink>
              </div>
              <div>
                <NavLink activeClassName='--active' to='/back-office/tickets' exact> Tickets Queue</NavLink>
              </div>



        </div>
      </div>
    );

}
export default BackOfficeNav;
