import {createContext} from 'react';

const TicketsContext = createContext(
    {
        ticketsState: {
            sessionID: "",
            reservationID: "",
            landed: true,
            inQueue: false,
            outQueue: false,
            reservingTickets: false,
            checkingOut: false,
            payingTickets: false,
            ticketsPayed: false,
            ticketsEmitted: false
        },
      dispatch: null
    },
);

export default TicketsContext;