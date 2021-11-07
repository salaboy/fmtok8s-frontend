import "./TicketsQueueUI.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function TicketsQueueUI({children}) {
  

    return (
      <div className={  cn({
          ["TicketsQueueUI"]: true
        })}>
          <h3>Tickets Queue</h3>
          {children}

      </div>
    );

}
export default TicketsQueueUI;
