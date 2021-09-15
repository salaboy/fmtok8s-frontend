import "./Nav.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import cn from 'classnames';

function Nav() {
  const {  currentSection } = useContext(AppContext);



    return (
      <div className={  cn({
          ["Nav"]: true,
          ["--backoffice"]: currentSection === "back-office",
        })}>
        <div className="Nav__container">
          {currentSection !== "back-office" && (
            <div className="Nav__main">

              <span>
                <NavLink activeClassName='--active' to='/agenda' exact> Agenda</NavLink>
              </span>
              <span>
                <NavLink activeClassName='--active' to='/speakers' exact> Speakers</NavLink>
              </span>
              <span>
                <NavLink activeClassName='--active' to='/proposals' exact> Proposals</NavLink>
              </span>
              <span>
                <NavLink activeClassName='--active' to='/about' exact> About</NavLink>
              </span>
            </div>
          )}
          <div className="Nav__back-office">
            {currentSection !== "back-office" && (
              <span>
                <NavLink activeClassName='--active' to='/back-office' exact> —> </NavLink>
              </span>
            )}
            {currentSection === "back-office" && (
              <span>
                <NavLink activeClassName='--active' to='/' exact> Back to Site </NavLink>
              </span>
            )}
          </div>
        </div>
      </div>
    );

}
export default Nav;
