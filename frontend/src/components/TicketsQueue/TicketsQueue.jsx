import "./TicketsQueue.scss";
import React, {useEffect, useRef, useState} from "react";
import axios from 'axios'
import cn from 'classnames';
import Button from '../../components/Button/Button'
import useInterval from "../../hooks/useInterval";
import {CloudEvent, HTTP} from "cloudevents";
import TicketQueueItem from "../TicketQueueItem/TicketQueueItem";


function TicketsQueue() {


    let [delay, setDelay] = useState(2000);
    let [queueBatchCount, setQueueBatchCount] = useState(10);
    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isPolling, setIsPolling] = useState(true);
    const [queueItems, setQueueItems] = useState([]);
    let [count, setCount] = useState(0);

    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;

        return () => {
            mounted.current = false;
        };
    }, []);

    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    function createMyGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const AddToQueue = () => {
        setLoading(true);
        for (var i = 0; i < queueBatchCount; i++) {
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

                setIsError(false);

            }).catch(err => {
                setIsError(true);

                console.log(err)
                console.log(err.response.data.message)
                console.log(err.response.data)
            });
        }
        setLoading(false);
    }

    useEffect(() => {
        if(mounted.current) {
            console.log("-> count is: " + count)
            console.log(" -> queue length: " + queueItems.length + " - at: " + new Date() )
            for (let i = 0; i < queueItems.length; i++) {
                console.log("queue item: " + JSON.stringify(queueItems[i]));
            }
        }
    }, [count]);

    useInterval(() => {
        if(mounted.current) {
            axios.get("/queue/").then(
                (response) => {
                    console.log("-> before changing queue items " + new Date())
                    setQueueItems(response.data)
                    console.log("-> after changing queue items " + new Date())
                    setCount(count + 1);
                }
            );

        }

    }, delay);


    return (
        <div className={cn({
            ["TicketsQueue"]: true,
        })}>
            <div>
                <Button main inverted disabled={loading}
                        clickHandler={() => AddToQueue()}>{loading ? 'Loading...' : 'Create Batch'}</Button>
            </div>
            {queueItems && queueItems.length > 0 && queueItems.map((item, index) => (
                <div className="TicketsQueue__List">
                    <TicketQueueItem id={item.sessionId}/>
                </div>
              ))
              }

              {queueItems && queueItems.length === 0 && (
                    <div className="TicketsQueue__Empty">
                      <span>There are no users in queue.</span>
                    </div>
                  )
              }





        </div>
    );

}

export default TicketsQueue;

//  {isError && <small className="mt-3 d-inline-block text-danger">Something went wrong. Please try again later.</small>}
//{ApprovalButtons(item)}
