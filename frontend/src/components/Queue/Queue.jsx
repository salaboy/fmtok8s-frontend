import "./Queue.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import { NavLink} from 'react-router-dom'
import AppContext from 'contexts/AppContext';
import Element from 'components/Element/Element'
import cn from 'classnames';

function Queue({position, size, time}) {



    return (
      <div className={  cn({
          ["Queue"]: true
        })}>
        Your Position: {position} <br/>
        People Queueing: {size} <br/>
        {time} minutes (approx. wait time.)

      </div>
    );

}
export default Queue;
