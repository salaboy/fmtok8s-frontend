import "./Debug.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import DebugItem from '../DebugItem/DebugItem'
import AppContext from '../../contexts/AppContext';
import cn from 'classnames';
import axios from "axios";

function Debug() {
    const {  currentSection } = useContext(AppContext);

    const [c4pInfo, setC4pInfo] = useState('') // state hook
    const [agendaInfo, setAgendaInfo] = useState('')
    const [notificationsInfo, setNotificationsInfo] = useState('')
    const [frontendInfo, setFrontendInfo] = useState('')



    useEffect(() => {                           // side effect hook
        axios({
            "method": "GET",
            "url": "/info",
            "headers": {}, "params": {}
        })
            .then((response) => {
                setFrontendInfo(response.data)
            })
            .catch((error) => {
                setFrontendInfo({"name":"Frontend Service","version":"N/A",
                    "url": "https://github.com/salaboy/fmtok8s-frontend/",
                    "podId": "N/A",
                    "podNamepsace": "N/A",
                    "podNodeName": "N/A",
                    "status" : "down"})

                console.log(error)
            })
        axios({
            "method": "GET",
            "url": "/c4p/info", // This is going throw the proxy in package.json
            "headers": {}, "params": {}
        })
            .then((response) => {
                setC4pInfo(response.data)
            })
            .catch((error) => {
                setC4pInfo({"name":"C4P Service","version":"https://github.com/salaboy/fmtok8s-c4p-service/",
                    "url": "N/A",
                    "podId": "N/A",
                    "podNamepsace": "N/A",
                    "podNodeName": "N/A",
                    "status" : "down"})

                console.log(error)
            })
        axios({
            "method": "GET",
            "url": "/agenda/info", // This is going throw the proxy in package.json
            "headers": {}, "params": {}
        })
            .then((response) => {
                setAgendaInfo(response.data)
            })
            .catch((error) => {
                setAgendaInfo(
                    {"name":"Agenda Service",
                        "version":"N/A",
                        "url": "https://github.com/salaboy/fmtok8s-agenda-service/",
                        "podId": "N/A",
                        "podNamepsace": "N/A",
                        "podNodeName": "N/A",
                        "status" : "down"}
                )

                console.log(error)
            })
        axios({
            "method": "GET",
            "url": "/email/info", // This is going throw the proxy in package.json
            "headers": {}, "params": {}
        })
            .then((response) => {
                setNotificationsInfo(response.data)
            })
            .catch((error) => {
                setNotificationsInfo({"name":"Email Service",
                    "version":"N/A",
                    "url": "https://github.com/salaboy/fmtok8s-email-service/",
                    "podId": "N/A",
                    "podNamepsace": "N/A",
                    "podNodeName": "N/A",
                    "status" : "down"})

                console.log(error)
            })

    }, [setC4pInfo, setAgendaInfo, setNotificationsInfo, setFrontendInfo])


    return (
        <div className={  cn({
            ["Debug"]: true,
            ["--backoffice"]: currentSection === "back-office",
        })}>
            <div className="Debug__container">
                <div className="Debug__container__badge">
                    <span>Debug</span>
                </div>
                {frontendInfo && (
                    <DebugItem
                        name={frontendInfo.name}
                        version={frontendInfo.version}
                        source={frontendInfo.url}
                        podId={frontendInfo.podId}
                        podNameSpace={frontendInfo.podNamepsace}
                        podNodeName={frontendInfo.podNodeName}
                        status={frontendInfo.status}
                    />
                )}
                {c4pInfo && (
                    <DebugItem
                        name={c4pInfo.name}
                        version={c4pInfo.version}
                        source={c4pInfo.url}
                        podId={c4pInfo.podId}
                        podNameSpace={c4pInfo.podNamepsace}
                        podNodeName={c4pInfo.podNodeName}
                        status={c4pInfo.status}
                    />
                )}
                {agendaInfo && (
                    <DebugItem
                        name={agendaInfo.name}
                        version={agendaInfo.version}
                        source={agendaInfo.url}
                        podId={agendaInfo.podId}
                        podNameSpace={agendaInfo.podNamepsace}
                        podNodeName={agendaInfo.podNodeName}
                        status={agendaInfo.status}
                    />
                )}
                {notificationsInfo && (
                    <DebugItem
                        name={notificationsInfo.name}
                        version={notificationsInfo.version}
                        source={notificationsInfo.url}
                        podId={notificationsInfo.podId}
                        podNameSpace={notificationsInfo.podNamepsace}
                        podNodeName={notificationsInfo.podNodeName}
                        status={notificationsInfo.status}
                    />
                )}
            </div>

        </div>
    );

}
export default Debug;