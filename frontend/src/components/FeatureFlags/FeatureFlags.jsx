import "./FeatureFlags.scss";
import React, { useState } from "react";
import cn from 'classnames';
import Toggle  from '../../components/Toggle/Toggle'



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
              <div className="FeatureFlag">
                <Toggle status={debugEnabled} /> Debug Enabled
              </div>
              <div className="FeatureFlag">
                <Toggle status={c4pEnabled} /> Call For Proposals Enabled
              </div>
              <div className="FeatureFlag">
                <Toggle status={ticketsEnabled} /> Tickets Portal Enabled
              </div>
              <div className="FeatureFlag">
                <Toggle status={speakersEnabled} /> Speakers Enabled
              </div>

            </div>


        </div>
    );

}

export default FeatureFlags;
