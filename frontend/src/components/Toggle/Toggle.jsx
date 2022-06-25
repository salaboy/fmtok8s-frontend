import "./Toggle.scss";
import React from "react";
import cn from 'classnames';


function Toggle({status}) {

    return (
      <div className={  cn({
          ["Toggle"]: true,
          ["--on"]: status === 'true'
        })}>
            <div className="Toggle-handle"> </div>
      </div>
    );

}
export default Toggle;
