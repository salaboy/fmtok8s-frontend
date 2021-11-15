import "./Sponsor.scss";
import React from "react";

import Element from '../../components/Element/Element'
import cn from 'classnames';

function Sponsor({name, imagePath, id }) {
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
