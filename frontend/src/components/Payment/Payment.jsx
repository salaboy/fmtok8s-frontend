import "./Payment.scss";
import React, {useEffect, useState, useContext, useReducer} from "react";
import axios from 'axios'

import cn from 'classnames';
import CardNumberField from "../Form/CardNumberField/CardNumberField"
import CardExpirationField from "../Form/CardExpirationField/CardExpirationField"
import TextField from '../../components/Form/TextField/TextField'
import Button from "../Button/Button";
import {CloudEvent, HTTP} from "cloudevents";
import CardsImage from '../../images/cards.png'

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

            ["Payment"]: true
        })}
        >

            <h3>Enter your payment information</h3>
            <br/>
            <div className="Form">
                <div id="ccFormFields" className="FormField">
                  <CardNumberField label="Card Number" name="ccNumber" reference={ccNumberRef}   />
                </div>
                <div className="FormGroup --inline">
                  <div id="ccFormFieldsHalf1" className="FormField --half">
                  <CardExpirationField label="Expiration Date"  />

                  </div>
                  <div id="ccFormFieldsHalf2" className="FormField --half">
                    <TextField small label="Security Code" maxLength="4" placeholder="000"  />

                  </div>
                </div>
              

                <Button main clickHandler={handleCheckout}
                        disabled={loading}>{loading ? 'Loading...' : 'Pay'}</Button> <div className="cards">
                            <img src={CardsImage} alt="Cards accepted"/>
                        </div>
            </div>
            <small>SessionID: {state.sessionID}</small><br/>
            <small>ReservationID: {state.reservationID}</small>

        </div>
    );

}

export default Payment;
