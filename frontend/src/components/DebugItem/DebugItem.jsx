import "./DebugItem.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function DebugItem({name, podNodeName, podId, podNameSpace, source, version, status }) {

    return (
        <div className={  cn({
            ["DebugItem"]: true,
            ["--down"]: status === "down"
        })}>
            <div className="DebugItem__header">
                <a href={source} target="_blank">{name} {version}</a>
            </div>
            <div className="DebugItem__pod">
                <div className="DebugItem__pod__name">
                    <span>Pod:</span> {podNameSpace}
                </div>
                <div className="DebugItem__pod__info">
                    <span>Id:</span> {podId}<br/>
                    <span>Node:</span> {podNodeName}
                </div>
            </div>

        </div>
    );

}
export default DebugItem;