import React, {useEffect, useState, useContext, useRef} from "react";
import {motion} from "framer-motion"
import {useLocomotiveScroll} from 'react-locomotive-scroll';
import AppContext from 'contexts/AppContext';
import Header from 'components/Header/Header'
import cn from 'classnames';
import Button from "../../components/Button/Button";
import ReserveTickets from "../../components/ReserveTickets/ReserveTickets";
import Payment from "../../components/Payment/Payment";

import axios from "axios";
import {HTTP, CloudEvent} from "cloudevents";
import useInterval from "hooks/useInterval"

function Tickets() {
    const {currentSection, setCurrentSection} = useContext(AppContext);
    //scroll

    const {scroll} = useLocomotiveScroll();

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [inQueue, setInQueue] = useState(false);
    const [outQueue, setOutQueue] = useState(false);
    const [reservingTickets, setReservingTickets] = useState(false);


    const [positionInQueue, setPositionInQueue] = useState(0);
    const [waitTimeInQueue, setWaitTimeInQueue] = useState(0);
    const [queueSize, setQueueSize] = useState(0);

    const [wsUrl, setWsUrl] = useState('');
    const ws = useRef();

    const [sessionID, setSessionID] = useState('');

    let [count, setCount] = useState(0);
    let [delay, setDelay] = useState(2000);


    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    const handleAbandon = () => {


    }

    const handleReserve = () => {
        setReservingTickets(true);
    }

    const handleJoin = () => {
        setLoading(true);

        const event = new CloudEvent({
            id: sessionID,
            type: "Queue.CustomerJoined",
            source: "website",
            correlationkey: sessionID,
            data: {
                sessionId: "" + sessionID,
                ticketsType: "",
                ticketsQuantity: "0",
                reservationId: ""
            },
        });

        const message = HTTP.binary(event);
        console.log("Sending Post to Broker!")
        axios.post('/broker', message.body, {headers: message.headers}).then(res => {

            setLoading(false);
            setIsError(false);
            setInQueue(true)



        }).catch(err => {

            setLoading(false);
            setIsError(true);
            // setInQueue(true);
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.data)
        });
    }

    useInterval(() => {
        if (inQueue) {
            axios.get("/queue/" + sessionID).then(
                (response) => {
                    console.log("position: " + response.data.position);
                    setPositionInQueue(response.data.position);
                    console.log("size: " + response.data.size);
                    setQueueSize(response.data.size);
                    console.log("waitTime: " + response.data.waitTime);
                    setWaitTimeInQueue(response.data.waitTime);
                }
            );
            setCount(count + 1);
        } else{

        }
    }, delay);

    useEffect(() => {
        setCurrentSection("tickets");
        if (scroll) {
            scroll.destroy();
            scroll.init();
        }
    }, [scroll]);


    useEffect(() => {
        if (wsUrl != "") {
            ws.current = new WebSocket(wsUrl);
            ws.current.onopen = () => console.log("ws connected");
            ws.current.onclose = (event) => console.log("ws closed: " + event.code);
            ws.current.onerror = (event) => console.log("ws error:" + event);

            return () => {
                ws.current.close();
            };
        }
    }, [wsUrl]);

    useEffect(() => {
        axios.interceptors.request.use(request => {
            console.log('Starting Request', JSON.stringify(request, null, 2))
            return request
        })

        axios.interceptors.response.use(response => {
            console.log('Response:', JSON.stringify(response, null, 2))
            return response
        })

        axios.post('/api/session').then(res => {
            console.log("Session Id From Post: " + res)
            setSessionID(res.data)

            console.log("Protocol: " + document.location.protocol);
            let wsURL = "ws://" + document.location.host + "/ws?sessionId=" + res.data;
            if (document.location.protocol === 'https:') {
                wsURL = "wss://" + document.location.host + "/ws?sessionId=" + res.data;
            }
            console.log("WS URL: " + wsURL);
            setWsUrl(wsURL)
        }).catch(err => {
            console.log(err)
        });

    }, [])

    useEffect(() => {
        if (ws.current && sessionID) {

            ws.current.onmessage = ce => {
                console.log("On message string: " + ce.data);
                const eventParsedJson = JSON.parse(ce.data)
                console.log("On message json: " + JSON.stringify(eventParsedJson));
                const event = new CloudEvent(eventParsedJson);
                console.log("On Event: " + event.toString());
                if (event.type === "Queue.CustomerExited") {
                    console.log("Cloud Event data: " + event.data);

                    setInQueue(false)
                    setOutQueue(true)

                    // sessionId = data.sessionId;
                    // readyToBuy = true;
                    // var queueList = document.getElementById('queue-list');
                    // var queueTitle = document.getElementById('queueTitle');
                    // var waitingLabel = document.getElementById('waitingLabel');
                    // queueList.className = "queue-list-hidden";
                    // queueTitle.innerHTML = "Reserve your tickets now!";
                    // waitingLabel.innerHTML = "";
                    // document.getElementById('proceed').className = "main-button";
                }

            };
        }
    }, [ws.current, sessionID]);

    //Handle advanced page transitions
    const pageVariants = {
        visible: {opacity: 1},
        hidden: {opacity: 0},
        exit: {opacity: 0, transition: {duration: .5}}
    }
    const pageAnimationStart = e => {
    };
    const pageAnimationComplete = e => {
    };


    return (
        <motion.div
            exit="exit"
            animate="visible"
            initial="hidden"
            variants={pageVariants}
            onAnimationStart={pageAnimationStart}
            onAnimationComplete={pageAnimationComplete}
        >

            <div className={cn({
                ["page"]: true,
                ["tickets"]: true
            })}
            >
                <Header/>
                <section>

                    <h1>Buy your In-Person Conference Tickets here. </h1>
                    <p>Meet face to face with amazing speakers and get the most out of the conference.
                        Limited tickets available here at 9:00 am GMT Monday.</p>


                    {!inQueue && !outQueue && (
                        <Button main clickHandler={handleJoin}
                                disabled={loading}>{loading ? 'Loading...' : 'Join Queue'}</Button>
                    )}

                    {inQueue && (
                        <div>
                            <p>{positionInQueue} , {waitTimeInQueue}, {queueSize}</p>
                            <Button main clickHandler={handleAbandon}
                                    disabled={loading}>{loading ? 'Loading...' : 'Abandon Queue'}</Button>
                        </div>
                    )}

                    {outQueue && (
                        <Button main clickHandler={handleReserve}
                                disabled={loading}>{loading ? 'Loading...' : 'Reserve Tickets'}</Button>
                    )}

                    {reservingTickets && (
                        <ReserveTickets sessionID={sessionID}/>
                    )}




                </section>
            </div>
        </motion.div>
    )
}

export default Tickets;
