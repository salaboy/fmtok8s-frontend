import "./TicketQueueItem.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import {NavLink} from 'react-router-dom'

import Element from 'components/Element/Element'
import Button from 'components/Button/Button'
import cn from 'classnames';
import {CloudEvent, HTTP} from "cloudevents";
import axios from "axios";

function TicketQueueItem({id}) {
    const [isError, setIsError] = useState(false);

    function createMyGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    const handleUnQueue = (id) => {
        const event = new CloudEvent({
            id: createMyGuid(),
            type: "Queue.CustomerAbandoned",
            source: "website",
            correlationkey: id,
            data: {
                sessionId: id
            },
        });

        const message = HTTP.binary(event);
        console.log("Sending Post to Broker!")
        axios.post('/broker', message.body, {headers: message.headers}).then(res => {

            setIsError(false);

        }).catch(err => {
            setIsError(true);

            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.data)
        });

    }

    return (
        <Element>
            <div className={cn({
                ["TicketQueueItem"]: true,

            })}>
                <div className="TicketQueueItem__Id">
                  <strong>PersonID:</strong> <br/>
                    {id}
                </div>


                <div className="TicketQueueItem__Actions">
                    <div>
                        <Button inverted clickHandler={() => handleUnQueue(id)}>Unqueue</Button>
                    </div>

                </div>

            </div>
        </Element>
    );

}

export default TicketQueueItem;
