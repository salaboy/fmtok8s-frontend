import "./Hero.scss";
import React, { useContext } from "react";
import AppContext from '../../contexts/AppContext';
import Element from '../../components/Element/Element'
import cn from 'classnames';

function Hero({country}) {
    return (
      <div className={  cn({
          ["Hero"]: true
        })}>
        <section>
        <div className="Hero__title">

            <div className="Hero__title__container" data-scroll data-scroll-speed="1">
              <Element inline>Cloud <br/>Conference <span>2025</span> </Element>
              <div className="Hero__title__country">
                <Element inline delay=".3">{country} </Element>
              </div>
            </div>

        </div>
        <div className="Hero__secondary">
          <div className="Hero__info" >
            <Element >
              <ul data-scroll data-scroll-speed="1.5">
                <li>O2 Arena </li>
                <li>London.</li>
                <li>Aug 7th/9th</li>
              </ul>
            </Element>
          </div>
          <div className="Hero__desc" >
            <Element>
              <p className="p p-b" data-scroll data-scroll-speed="3">
                Join us this year to the 10th anniversary of the Cloud Conference! More about the latest and greatest in the industry.
              </p>
            </Element>
          </div>
        </div>
        </section>
      </div>
    );

}
export default Hero;
