import "./Select.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function Select({name, label, value, children, changeHandler, error, help, reference, small}) {


    var errorElement;
    if(error){
      errorElement = <div className="Select__error-message">{error}</div>
    }
    var helpElement;
    if(help){
      helpElement = <div className="Select__help-message">{help}</div>
    }

    return (
      <div className={  cn({
          ["Select"]: true,
          ["--small"]: small === true,

        })}>
        <label>{label}</label>
        <select id={name}  value={value} onChange={changeHandler} ref={reference}>
          {children}
        </select>
        {errorElement}
        {helpElement}
      </div>
    );

}
export default Select;
