import "./Sponsor.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function Sponsor({id, name, imagePath}) {
    const {  currentSection } = useContext(AppContext);

    return (

        <div className={  cn({
            ["Sponsor"]: true,
          })}>
          <Element>
          <div className="Sponsor__image">
              {id}
              {name}
              {imagePath}

          </div>
          </Element>

        </div>

    );

}
export default Sponsor;
