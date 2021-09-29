import "./ReserveTickets.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import axios from 'axios'

import cn from 'classnames';
import Button from "../Button/Button";
import {CloudEvent, HTTP} from "cloudevents";
import Payment from "../Payment/Payment";

function ReserveTickets(props) {

    const [reservationID, setReservationID] = useState('');
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [checkingOut, setCheckingOut] = useState(false);
    const {sessionID} = props;


    const ticketsTypeRef = React.createRef();
    const ticketsQuantityRef = React.createRef();

    useEffect(() => {


        axios.post('/api/reservation').then(res => {
            console.log("Reservation Id From Post: " + res)
            setReservationID(res.data)


        }).catch(err => {
            console.log(err)
        });

    }, [])

    const handleMakeReservation = () => {

        console.log("Tickets Type: " + ticketsTypeRef.current.value)
        console.log("Tickets Quantity: " + ticketsQuantityRef.current.value)
        const event = new CloudEvent({
            id: sessionID,
            type: "Tickets.Reserved",
            source: "website",
            correlationkey: sessionID,
            data: {
                sessionId: "" + sessionID,
                ticketsType: ticketsTypeRef.current.value,
                ticketsQuantity: ticketsQuantityRef.current.value,
                reservationId: reservationID
            },
        });

        const message = HTTP.binary(event);

        console.log("Sending Post to Broker!")
        axios.post('/broker', message.body, {headers: message.headers}).then(res => {

            setLoading(false);
            setIsError(false);
            setCheckingOut(true);
        }).catch(err => {
            setLoading(false);
            setIsError(true);
            setCheckingOut(true);
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.data)
        });


    }

    return (
        <div className={cn({
            ["page"]: true,
            ["reserveTickets"]: true
        })}
        >
            <label>SessionID: {sessionID}</label>
            <label>ReservationID: {reservationID}</label>
            <br/>
            {!checkingOut && (
                <div>
                    <label>Type</label>
                    <select name="ticketsType" ref={ticketsTypeRef} id="ticketsType">
                        <option value="standing">Standing</option>
                        <option value="balcony 1">Balcony Left</option>
                        <option value="balcony 2">Balcony Right</option>
                        <option value="far away">Far Away</option>
                    </select>
                    <br/>

                    <label>Quantity</label>
                    <input type="number" ref={ticketsQuantityRef} id="ticketsQuantity"/>


                    <Button main clickHandler={handleMakeReservation}
                            disabled={loading}>{loading ? 'Loading...' : 'Reserve Your Tickets'}</Button>
                </div>
            )}

            {checkingOut && (
                <Payment sessionID={sessionID} reservationID={reservationID}/>
            )}
        </div>
    );

}

export default ReserveTickets;