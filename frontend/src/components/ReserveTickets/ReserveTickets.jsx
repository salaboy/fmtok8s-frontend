import "./ReserveTickets.scss";
import React, {useEffect, useState, useContext, useReducer} from "react";
import axios from 'axios'

import cn from 'classnames';
import Button from "../Button/Button";
import {CloudEvent, HTTP} from "cloudevents";
import TicketsContext from 'contexts/TicketsContext';
import {ticketsStateReducer} from "../../reducers/TicketsStateReducer";

function ReserveTickets() {

    const { state, dispatch } = useContext(TicketsContext)


    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const ticketsTypeRef = React.createRef();
    const ticketsQuantityRef = React.createRef();

    useEffect(() => {
        console.log("Reserve Tickets State changed")
        console.log(state)

    }, [state]);

    useEffect(() => {


        axios.post('/api/reservation').then(res => {
            console.log("Reservation Id From Post: " + res)

            dispatch({type: "reservationIdCreated", payload: res.data})

        }).catch(err => {
            console.log(err)
        });

    }, [])

    const handleMakeReservation = () => {

        console.log("Tickets Type: " + ticketsTypeRef.current.value)
        console.log("Tickets Quantity: " + ticketsQuantityRef.current.value)
        const event = new CloudEvent({
            id: state.sessionID,
            type: "Tickets.Reserved",
            source: "website",
            correlationkey: state.sessionID,
            data: {
                sessionId: "" + state.sessionID,
                ticketsType: ticketsTypeRef.current.value,
                ticketsQuantity: ticketsQuantityRef.current.value,
                reservationId: state.reservationID
            },
        });

        const message = HTTP.binary(event);

        console.log("Sending Post to Broker!")
        axios.post('/broker', message.body, {headers: message.headers}).then(res => {

            setLoading(false);
            setIsError(false);
            dispatch({type: "checkingOut", payload: true})
        }).catch(err => {
            setLoading(false);
            setIsError(true);
            dispatch({type: "checkingOut", payload: true})
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
            <label>SessionID: {state.sessionID}</label>
            <label>ReservationID: {state.reservationID}</label>
            <br/>

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


        </div>
    );

}

export default ReserveTickets;