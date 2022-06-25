import "./SectionHero.scss";
import React from "react";
import Element from '../../components/Element/Element'
import cn from 'classnames';

function SectionHero({title, small, border}) {

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
          ["--border"]: border === true,
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
