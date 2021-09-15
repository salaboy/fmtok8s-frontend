import "./TextField.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function TextField({name, label, value, changeHandler, error, help}) {

    var errorElement;
    if(error){
      errorElement = <div className="TextField__error-message">{error}</div>
    }
    var helpElement;
    if(help){
      helpElement = <div className="TextField__help-message">{help}</div>
    }

    return (
      <div className={  cn({
          ["TextField"]: true,

        })}>
        <label>{label}</label>
        <input id={name} type="text" value={value} onChange={changeHandler}/>
        {errorElement}
        {helpElement}
      </div>
    );

}
export default TextField;
