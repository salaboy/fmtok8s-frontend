import "./Bank.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import ReactHtmlParser from 'react-html-parser';

import cn from 'classnames';
import TicketsContext from "../../contexts/TicketsContext";


function Bank(props) {

    const { state, dispatch } = useContext(TicketsContext)
    const paymentIframeString = "<iframe src='" + "/payments/?sessionId=" + state.sessionID + "&reservationId=" + state.reservationID + "'  width='100%' height='300px' />"

    console.log("URL for Iframe: " + paymentIframeString)
    return (
        <div className={cn({

            ["Bank"]: true
        })}
        >
            <div>{ ReactHtmlParser(paymentIframeString) } </div>

        </div>
    );

}

export default Bank;
