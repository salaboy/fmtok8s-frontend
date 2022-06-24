import "./AgendaItem.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from '../../contexts/AppContext';
import Element from '../../components/Element/Element'
import cn from 'classnames';

function AgendaItem({name, day, time, author, authorImage, position, description}) {
    const {  currentSection } = useContext(AppContext);
    const [open, setOpen] = useState(false) // state hook

    const handleOpen = () => {
      if(open){
        setOpen(false);
      }else {
        setOpen(true);
      }


    }

    return (
      <Element   >
      <div className={  cn({
          ["AgendaItem"]: true,
          ["--first"]: position===0,
          ["--yellow"]: day==="Monday",
          ["--orange"]: day==="Tuesday",
          ["--red"]: day==="Wednesday",
          ["--green"]: day==="Thursday",
          ["--blue"]: day==="Friday",
          ["--light-blue"]: day==="Saturday",
          ["--violet"]: day==="Sunday",

        })}
          onClick={() => handleOpen()}
        >
        <div className="AgendaItem__date">
          <div className="AgendaItem__day">
            {day}
          </div>
          <div className="AgendaItem__time">
            {time}
          </div>
        </div>
        <div className="AgendaItem__data">
          <h3>{name}</h3>
          <p className="p p-s"> {author}</p>
          {open && (
            <div className="AgendaItem__description">
              <p>{description} asd</p>
            </div>
          )}
        </div>

        {authorImage && (
          <div className="AgendaItem__image">
            <div className="AgendaItem__avatar">
              {authorImage}
            </div>
          </div>
        )}
      </div>
      </Element>
    );

}
export default AgendaItem;
