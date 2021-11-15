import "./Footer.scss";
import React, { useContext } from "react";
import AppContext from '../../contexts/AppContext';
import Element from '../../components/Element/Element'
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
