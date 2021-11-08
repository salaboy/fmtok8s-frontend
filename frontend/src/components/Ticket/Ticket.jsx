import "./Ticket.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import ReactHtmlParser from 'react-html-parser';

import cn from 'classnames';
import TicketsContext from "../../contexts/TicketsContext";


function Ticket({sessionID}) {

    return (
        <div className={cn({

            ["Ticket"]: true
        })}
        >
          <div className="Ticket__Container">
            <h3 className="Ticket__Title">Cloud Conf 2025</h3>
            <h4 className="Ticket__Country">🇬🇧 United Kingdom</h4>
            <div className="Ticket__Location">O2 Arena, London.</div>
            <div className="Ticket__Date">Aug 7th—9th</div>
            <div className="Ticket__Data">
              Quanity: 2. Purchase ID:{sessionID}
            </div>

          </div>
        </div>
    );

}

export default Ticket;
