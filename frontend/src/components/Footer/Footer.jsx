import "./Footer.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import Logo from 'images/logo.svg';
import LogoWhite from 'images/logo-white.svg';
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function Footer() {
    const { currentSection } = useContext(AppContext);

    return (
      <div className={  cn({
          ["Footer"]: true,
          ["--backoffice"]: currentSection === "back-office",
        })}>
        <div className="Footer__text">
          <Element>
            Cloud Conf 2025™
          </Element>
        </div>
        <div className="Footer__contact">
          <Element>
            info@cloudconf.com
          </Element>
        </div>
      </div>
    );

}
export default Footer;
