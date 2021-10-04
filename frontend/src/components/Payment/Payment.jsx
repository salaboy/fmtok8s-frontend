import "./Payment.scss";
import React, {useEffect, useState, useContext, useReducer} from "react";
import axios from 'axios'

import cn from 'classnames';
import Button from "../Button/Button";
import {CloudEvent, HTTP} from "cloudevents";

import TicketsContext from "../../contexts/TicketsContext";


function Payment() {


    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const { state, dispatch } = useContext(TicketsContext)

    const ccNumberRef = React.createRef();


    const handleCheckout = () => {

        console.log("CC Number: " + ccNumberRef.current.value)

        const event = new CloudEvent({
            id: state.sessionID,
            type: "Tickets.PaymentRequested",
            source: "website",
            correlationkey: state.sessionID,
            data: {
                sessionId: state.sessionID,
                reservationId: state.reservationID,
                cc: ccNumberRef.current.value
            },
        });

        const message = HTTP.binary(event);

        console.log("Sending Post to Broker!")
        axios.post('/broker', message.body, {headers: message.headers}).then(res => {

            setLoading(false);
            setIsError(false);
            dispatch({type: "payingTickets" , payload: true})

        }).catch(err => {
            setLoading(false);
            setIsError(true);
            dispatch({type: "payingTickets" , payload: true})
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.data)
        });


    }

    useEffect(() => {                           // side effect hook

    }, [])

    return (
        <div className={cn({
            ["page"]: true,
            ["payment"]: true
        })}
        >
            <label>SessionID: {state.sessionID}</label>
            <label>ReservationID: {state.reservationID}</label>
            <br/>

            <div>
                <div id="ccFormFields" className="form-field">
                    <label>Credit Card Number</label>
                    <div className="form-field quarter">
                        <input id="ccNumber" ref={ccNumberRef} type="number" maxLength="4" value="1111"/>
                    </div>
                    <div className="form-field quarter">
                        <input type="number" maxLength="4" value="2222"/>
                    </div>
                    <div className="form-field quarter">
                        <input type="number" maxLength="4" value="3333"/>
                    </div>
                    <div className="form-field quarter">
                        <input type="number" maxLength="4" value="4444"/>
                    </div>
                </div>
                <div id="ccFormFieldsHalf1" className="form-field half">
                    <label>Expiration Date</label>
                    <div className="form-field xsmall">
                        <input placeholder="MM" type="number" maxLength="2" max="31" value="11"/>
                    </div>
                    <div className="form-field xsmall">
                        <input placeholder="YY" type="number" maxLength="2" max="12" value="22"/>
                    </div>
                </div>
                <div id="ccFormFieldsHalf2" className="form-field half">
                    <label>Security Code</label>
                    <div className="form-field small">
                        <input type="password" maxLength="3" value="123"/>
                    </div>

                </div>
                <br/>
                <div id="ccFormFields2" className="form-field">
                    <div className="cards">
                        <img src="cards.png" alt=""/>
                    </div>
                </div>

                <Button main clickHandler={handleCheckout}
                        disabled={loading}>{loading ? 'Loading...' : 'Pay'}</Button>
            </div>

        </div>
    );

}

export default Payment;