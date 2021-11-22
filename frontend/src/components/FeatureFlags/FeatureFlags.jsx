import "./FeatureFlags.scss";
import React, { useState } from "react";
import cn from 'classnames';



function FeatureFlags() {

    let ticketsEnabled = window._env_.FEATURE_TICKETS_ENABLED
    let c4pEnabled = window._env_.FEATURE_C4P_ENABLED

    return (
        <div className={cn({
            ["FeatureFlags"]: true,
        })}>
            <div>
                <h2>Call For Proposals Enabled: {(c4pEnabled)?"true":"false"}</h2>
                <h2>Tickets Portal Enabled: { (ticketsEnabled)?"true":"false"}</h2>
            </div>


        </div>
    );

}

export default FeatureFlags;

