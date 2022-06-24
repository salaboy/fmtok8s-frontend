import "./Speaker.scss";
import React from "react";
import Element from '../../components/Element/Element'
import cn from 'classnames';

function Speaker({name, position, description, authorImage, externalImage, small}) {

    var image;
    if(externalImage){
      image =  authorImage
    }else {
      image = process.env.PUBLIC_URL + "/" + authorImage
    }
    return (
      <Element customClass="Speaker-container" >
        <div className={  cn({
            ["Speaker"]: true,
            ["--small"]: small === true,
          })}>
          <div className="Speaker__image">
            <div className="Speaker__avatar">
                {<img src={image} />}
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
