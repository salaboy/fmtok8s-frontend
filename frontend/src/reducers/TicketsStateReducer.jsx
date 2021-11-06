//https://stackoverflow.com/questions/55301495/issues-with-usereducer-not-synchronously-updating-the-state
export const ticketsStateReducer = (currentState, action) => {
    if (action.type === 'abandoned') {
        console.log("ACTION abandoned")
        return {
            landed: true,
            sessionID: "",
        }
    }

    if (action.type === 'sessionIdCreated') {

        console.log("ACTION sessionIdCreated")
        return {
            landed: currentState.landed,
            sessionID: action.payload
        }
    }
    if (action.type === 'reservationIdCreated') {

        console.log("ACTION reservationIdCreated")

        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: action.payload,
            inQueue: currentState.inQueue,
            outQueue: currentState.outQueue,
            reservingTickets: currentState.reservingTickets,
            checkingOut: currentState.checkingOut,

        }
    }
    if (action.type === 'joinedQueue') {

        console.log("ACTION joinedQueue")
        return {
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            landed: false,
            inQueue: true
        }
    }
    if (action.type === 'exitedQueue') {

        console.log("ACTION exitedQueue")

        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            inQueue: false,
            outQueue: true
        }
    }
    if (action.type == 'reservingTickets') {
        console.log("ACTION ticketsReserved")
        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            inQueue: currentState.inQueue,
            outQueue: false,
            reservingTickets: true
        }
    }
    if (action.type == 'checkingOut') {
        console.log("ACTION checkingOut")
        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            inQueue: currentState.inQueue,
            outQueue: currentState.outQueue,
            reservingTickets: false,
            checkingOut: true
        }
    }

    if (action.type == 'payingTickets') {
        console.log("ACTION payingTickets")
        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            inQueue: currentState.inQueue,
            reservingTickets: currentState.reservingTickets,
            checkingOut: false,
            payingTickets: true
        }
    }
    if (action.type == 'ticketsPayed') {

        console.log("ACTION ticketsPayed")
        console.log(currentState)
        return {
            landed: currentState.landed,
            sessionID: currentState.sessionID,
            reservationID: currentState.reservationID,
            inQueue: currentState.inQueue,
            outQueue: currentState.outQueue,
            reservingTickets: currentState.reservingTickets,
            checkingOut: currentState.checkingOut,
            payingTickets: false,
            ticketsPayed: true
        }
    }
    if (action.type == 'ticketsEmitted') {

        console.log("ACTION ticketsEmitted")

        return {
            landed: false,
            inQueue: false,
            outQueue: false,
            reservingTickets: false,
            payingTickets: false,
            ticketsPayed: false,
            ticketsEmitted: true
        }
    }
    return currentState
}



