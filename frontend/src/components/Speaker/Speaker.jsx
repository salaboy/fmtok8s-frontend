import "./Speaker.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function Speaker({name, position, description, authorImage}) {
    const {  currentSection } = useContext(AppContext);
    var image = window.location.origin + "/" + authorImage
    return (
      <Element customClass="Speaker-container" >
        <div className={  cn({
            ["Speaker"]: true,
          })}>
          <div className="Speaker__image">
            <div className="Speaker__avatar">
                <img src={image} />
            </div>
          </div>
          <div className="Speaker__title">
            <h3>{name}</h3>
            <h5>{position}</h5>
          </div>
          <div className="Speaker__desc">
            <p>{description}</p>
          </div>
        </div>
      </Element>
    );

}
export default Speaker;
