import "./Queue.scss";
import React from "react";

import cn from 'classnames';

function Queue({position, size, time}) {

    let queueElements = [];
    for (let i = 0; i < size; i++) {
      queueElements.push(
        <div key={i} className={  cn({
          ["Queue__Person"]: true,
          ["--user"]: position-1 === i
        })}></div>
      );
    }

    return (
      <div className={  cn({
          ["Queue"]: true
        })}>
        <h3>Your are {position} of {size} on the tickets queue.</h3>
        <small> Waiting time: {time} minutes approx.</small>
        <div className="Queue__People">
          {queueElements}
        </div>

      </div>
    );

}
export default Queue;
