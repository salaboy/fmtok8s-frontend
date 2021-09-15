import "./SectionHero.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function SectionHero({title, small}) {
    const {  currentSection } = useContext(AppContext);

    var titleElement;
    if(small){
      titleElement = (
        <h2 data-scroll data-scroll-speed="1">
          <Element inline>{title} </Element>
        </h2>
      )
    }else {
      titleElement = (
        <h1 data-scroll data-scroll-speed="1">
          <Element inline>{title} </Element>
        </h1>
      )
    }

    return (
      <div className={  cn({
          ["SectionHero"]: true,
          ["--small"]: small === true,
        })}>
        <section>
          <div className="SectionHero__title">
              {titleElement}
          </div>

        </section>
      </div>
    );

}
export default SectionHero;
