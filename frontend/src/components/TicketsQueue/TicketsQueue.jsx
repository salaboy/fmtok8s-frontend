import "./TicketsQueue.scss";
import React, {useEffect, useRef, useState} from "react";
import axios from 'axios'
import cn from 'classnames';
import Button from '../../components/Button/Button'
import useInterval from "../../hooks/useInterval";
import {CloudEvent, HTTP} from "cloudevents";
import TicketQueueItem from "../TicketQueueItem/TicketQueueItem";


function TicketsQueue() {
    const delay = 3000;
    const queueBatchCount = 10;

    const [queueItems, setQueueItems] = useState([]);

    useInterval(() => {
        axios.get("/queue/").then(
            (response) => {
                console.log("Customers in queue from rest request:" + response.data.length);
                setQueueItems((prevQueueItems) => response.data)
            }
        ).catch((error) => {
            console.log(error)
        });
    }, delay)



    function createMyGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function AddToQueue() {
        for (let i = 0; i < queueBatchCount; i++) {
            let mockSessionId = "mock-" + i + createMyGuid();
            const event = new CloudEvent({
                id: createMyGuid(),
                type: "Queue.CustomerJoined",
                source: "website",
                correlationkey: mockSessionId,
                data: {
                    sessionId: mockSessionId,
                    ticketsType: "",
                    ticketsQuantity: "0",
                    reservationId: ""
                },
            });

            const message = HTTP.binary(event);
            console.log("Sending Post to Broker!")
            axios.post('/broker/', message.body, {headers: message.headers}).then(res => {

            }).catch(err => {

                console.log(err)
                console.log(err.response.data.message)
                console.log(err.response.data)
            });
        }
        console.log("Rendering Tickets queue")
    }


    return (
        <div className={cn({
            ["TicketsQueue"]: true,
        })}>
            <div>
                <Button main inverted
                        clickHandler={() => AddToQueue()}>Create Batch</Button>
            </div>

            { queueItems && queueItems.length > 0 && (
                <p>Customers in the queue: {queueItems.length} </p>
             )
            }
            {
                queueItems && queueItems.length > 0 && queueItems.map((item, index) => (

                    <div className="TicketsQueue__List">
                        <TicketQueueItem id={item.sessionId}/>
                    </div>
                ))
            }

            {queueItems && queueItems.length == 0 && (
                <div className="TicketsQueue__Empty">
                    <span>There are no users in queue.</span>
                </div>
            )
            }


        </div>
    );

}

export default TicketsQueue; //https://linguinecode.com/post/prevent-re-renders-react-functional-components-react-memo

