import "./FeatureFlags.scss";
import React, { useState } from "react";
import cn from 'classnames';



function FeatureFlags() {

    let ticketsEnabled = window._env_.FEATURE_TICKETS_ENABLED
    let c4pEnabled = window._env_.FEATURE_C4P_ENABLED
    let speakersEnabled = window._env_.FEATURE_SPEAKERS_ENABLED
    let debugEnabled = window._env_.FEATURE_DEBUG_ENABLED

    return (
        <div className={cn({
            ["FeatureFlags"]: true,
        })}>
            <div>
                <h5>Debug Enabled: {debugEnabled}</h5>
                <h5>Call For Proposals Enabled: {c4pEnabled}</h5>
                <h5>Tickets Portal Enabled: {ticketsEnabled}</h5>
                <h5>Speakers Enabled: {speakersEnabled}</h5>
            </div>


        </div>
    );

}

export default FeatureFlags;

