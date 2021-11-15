import "./Agenda.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import axios from 'axios'
import AgendaItem from '../../components/AgendaItem/AgendaItem'
import cn from 'classnames';

function Agenda(props) {

    const [agendaItems, setAgendaItems] = useState('') // state hook
    const {day, highlights} = props;

    const mockAgendaItemsMonday = [{
        "title": "Cached Entry",
        "author": "Cached Author",
        "time": "1pm",
        "day": "Monday"
    }]
    const mockAgendaItemsTuesday = [{
        "title": "Cached Entry",
        "author": "Cached Author",
        "time": "1pm",
        "day": "Tuesday"
    }]


    useEffect(() => {                           // side effect hook
        var dayString = ''
        if (day) {
            dayString = 'day/' + day
        } else if (highlights) {
            dayString = 'highlights'
        }
        console.log("Querying with: " + "/agenda/" + dayString)
        axios({
            "method": "GET",
            "url": "/agenda/" + dayString, // This is going throw the proxy in package.json
            "headers": {}, "params": {}
        })
            .then((response) => {
                setAgendaItems(response.data)
            })
            .catch((error) => {
                if(dayString.includes("highlights") || dayString.includes("Monday")){
                    setAgendaItems(mockAgendaItemsMonday)
                }else {
                    setAgendaItems(mockAgendaItemsTuesday)
                }

                console.log(error)
            })
    }, [setAgendaItems])

    return (
        <div className={cn({
            ["Agenda"]: true,
        })}>
            <div>
                {agendaItems && agendaItems.length > 0 && agendaItems.map((item, index) => (

                    <AgendaItem
                        name={item.title}
                        day={item.day}
                        time={item.time}
                        key={index}
                        position={index}
                        author={item.author}
                        authorImage="{item.authorImage}"

                    />


                ))}
                {agendaItems && agendaItems.length == 0 && (
                    <span>
               There are no confirmed talks just yet.
                    </span>
                )}
            </div>

        </div>
    );

}

export default Agenda;
