import "./Debug.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import DebugItem from 'components/DebugItem/DebugItem'
import AppContext from 'contexts/AppContext';
import cn from 'classnames';
import axios from "axios";

function Debug() {
    const {  currentSection } = useContext(AppContext);

    const [c4pInfo, setC4pInfo] = useState('') // state hook


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

        axios({
            "method": "GET",
            "url": "/agenda/info", // This is going throw the proxy in package.json
            "headers": {}, "params": {}
        })
            .then((response) => {
                setC4pInfo(response.data)
            })
            .catch((error) => {
                setC4pInfo({"name":"C4P Service","status" : "down"})

                console.log(error)
            })
    }, [])


    return (
        <div className={  cn({
            ["Debug"]: true,
            ["--backoffice"]: currentSection === "back-office",
        })}>
            <div className="Debug__container">
                {c4pInfo && (
                <DebugItem
                    name={c4pInfo.name}
                    version={c4pInfo.version}
                    source={c4pInfo.url}
                    podId={c4pInfo.podIp}
                    podNameSpace={c4pInfo.podNamespace}
                    podNodeName={c4pInfo.podNodename}
                    status={c4pInfo.status}
                />
                )}

            </div>

        </div>
    );

}
export default Debug;