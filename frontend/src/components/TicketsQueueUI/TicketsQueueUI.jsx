import "./TicketsQueueUI.scss";
import React from "react";

import cn from 'classnames';

function TicketsQueueUI({children}) {


    return (
      <div className={  cn({
          ["TicketsQueueUI"]: true
        })}>
        
          {children}

      </div>
    );

}
export default TicketsQueueUI;
