import "./Sponsor.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function Sponsor({name, imagePath, id }) {
    const {  currentSection } = useContext(AppContext);
    var image = process.env.PUBLIC_URL + "/" + imagePath
    return (

        <div className={  cn({
            ["Sponsor"]: true,
          })}>
          <Element>
          <div className="Sponsor__image">
              {<img src={image} />}
          </div>
          </Element>

        </div>

    );

}
export default Sponsor;
