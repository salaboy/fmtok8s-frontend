import React, {useEffect, useState, useContext, useRef, useReducer} from "react";
import {motion} from "framer-motion"
import {useLocomotiveScroll} from 'react-locomotive-scroll';
import AppContext from 'contexts/AppContext';
import TicketsContext from 'contexts/TicketsContext';
import Header from 'components/Header/Header'
import cn from 'classnames';
import Button from "../../components/Button/Button";
import ReserveTickets from "../../components/ReserveTickets/ReserveTickets";


import axios from "axios";
import {HTTP, CloudEvent} from "cloudevents";
import useInterval from "hooks/useInterval"
import {ticketsStateReducer} from "../../reducers/TicketsStateReducer";
import Payment from "../../components/Payment/Payment";
import Bank from "../../components/Bank/Bank";

function Tickets() {

    const {ticketsState} = useContext(TicketsContext)
    const [state, dispatch] = useReducer(ticketsStateReducer, ticketsState)
    const {currentSection, setCurrentSection} = useContext(AppContext);

    //scroll

    const {scroll} = useLocomotiveScroll();

    const [loading, setLoading] = useState(false);
    const [isError, setIsError] = useState(false);


    const [positionInQueue, setPositionInQueue] = useState(0);
    const [waitTimeInQueue, setWaitTimeInQueue] = useState(0);
    const [queueSize, setQueueSize] = useState(0);

    const [wsUrl, setWsUrl] = useState('');
    const ws = useRef();


    let [count, setCount] = useState(0);
    let [delay, setDelay] = useState(2000);


    function handleDelayChange(e) {
        setDelay(Number(e.target.value));
    }

    const handleAbandon = () => {

    }

    const handleReserve = () => {
        dispatch({type: "reservingTickets", payload: true})
    }


    const handleJoin = () => {
        setLoading(true);

        const event = new CloudEvent({
            id: state.sessionID,
            type: "Queue.CustomerJoined",
            source: "website",
            correlationkey: state.sessionID,
            data: {
                sessionId: "" + state.sessionID,
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
            dispatch({type: "joinedQueue", payload: true})

        }).catch(err => {

            setLoading(false);
            setIsError(true);
            dispatch({type: "joinedQueue", payload: true})
            console.log(err)
            console.log(err.response.data.message)
            console.log(err.response.data)
        });
    }

    useInterval(() => {
        if (state.inQueue) {
            axios.get("/queue/" + state.sessionID).then(
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
        } else {

        }
    }, delay);

    useEffect(() => {
        console.log("State changed")
        console.log(state)

    }, [state]);

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
            dispatch({type: "sessionIdCreated", payload: res.data})

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
        if (ws.current) {
            console.log("registering on message")
            ws.current.onmessage = ce => {
                const eventParsedJson = JSON.parse(ce.data)
                console.log("On message json: " + JSON.stringify(eventParsedJson));
                const event = new CloudEvent(eventParsedJson);
                console.log("Cloud Event data: " + event.data);
                if (event.type === "Queue.CustomerExited") {
                    dispatch({type: "exitedQueue", payload: true})

                    // sessionId = data.sessionId;
                    // readyToBuy = true;
                    // var queueList = document.getElementById('queue-list');
                    // var queueTitle = document.getElementById('queueTitle');
                    // var waitingLabel = document.getElementById('waitingLabel');
                    // queueList.className = "queue-list-hidden";
                    // queueTitle.innerHTML = "Reserve your tickets now!";
                    // waitingLabel.innerHTML = "";
                    // document.getElementById('proceed').className = "main-button";
                } else if (event.type === "Tickets.PaymentsAuthorized") {
                    console.log("Tickets.PaymentsAuthorized")
                    dispatch({type: "ticketsPayed", payload: true})
                    // var data = JSON.parse(ce["data"]);
                    // console.log(data);
                    // document.getElementById("nextButton").className = "main-button";
                    // document.getElementById("payButton").className = "main-button hidden";

                } else if (event.type === "Tickets.Reservation1MExpired") {
                    // makeYourPaymentReminderToast();
                    console.log("Tickets.Reservation1MExpired")
                } else if (event.type === "Tickets.ReservationTimedOut") {
                    console.log("Tickets.ReservationTimedOut")

                }
                // paymentTimedOutToast();
                // var xhr = new XMLHttpRequest();
                // xhr.open("POST", "/broker", true);
                // var data = JSON.stringify(
                //     {
                //         sessionId:  "${sessionId}",
                //     }
                // );
                // xhr.setRequestHeader('Content-Type', 'application/json');
                // xhr.setRequestHeader('Ce-Id', 'CE-' +  "${sessionId}");
                // xhr.setRequestHeader('Ce-Type', 'Queue.CustomerAbandoned');
                // xhr.setRequestHeader('Ce-Source', 'website');
                // xhr.setRequestHeader('Ce-Specversion', '1.0');
                // xhr.setRequestHeader('correlationKey',  "${sessionId}");
                //
                //
                // xhr.onreadystatechange = function () {
                //     if (xhr.readyState === 4) {
                //         callbackClose(xhr.response);
                //     }
                // }

            };
        }
    }, [ws.current]);

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


                    {state.landed && (
                        <Button main clickHandler={handleJoin}
                                disabled={loading}>{loading ? 'Loading...' : 'Join Queue'}</Button>
                    )}

                    {state.inQueue && (

                            <div>
                                <p>{positionInQueue} , {waitTimeInQueue}, {queueSize}</p>
                                <Button main clickHandler={handleAbandon}
                                        disabled={loading}>{loading ? 'Loading...' : 'Abandon Queue'}</Button>
                            </div>

                    )}

                    {state.outQueue && (

                            <Button main clickHandler={handleReserve}
                                    disabled={loading}>{loading ? 'Loading...' : 'Reserve Tickets'}</Button>

                    )}

                    {state.reservingTickets && (
                        <TicketsContext.Provider value={{state, dispatch}}>
                            <ReserveTickets/>
                        </TicketsContext.Provider>
                    )}

                    {state.checkingOut && (
                        <TicketsContext.Provider value={{state, dispatch}}>
                            <Payment/>
                        </TicketsContext.Provider>
                    )}

                    {state.payingTickets && (
                        <TicketsContext.Provider value={{state, dispatch}}>
                            <Bank/>
                        </TicketsContext.Provider>
                    )}
                    {state.ticketsPayed && (
                        <TicketsContext.Provider value={{state, dispatch}}>
                            <div>{state.sessionID}</div>
                        </TicketsContext.Provider>
                    )}

                </section>
            </div>
        </motion.div>
    )
}

export default Tickets;
