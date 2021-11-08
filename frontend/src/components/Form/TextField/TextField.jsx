import "./TextField.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function TextField({name, label, value, changeHandler, error, help, reference, type, number, small, maxLenght, placeholder}) {

    var typeElement;
    if(type){
      typeElement = type
    }else {
      typeElement = "text"
    }

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
          ["--number"]: number === true,
          ["--small"]: small === true

        })}>
        <label>{label}</label>
        <input id={name} type={typeElement} value={value} onChange={changeHandler} ref={reference} placeholder={placeholder} maxLength={maxLenght}/>
        {errorElement}
        {helpElement}
      </div>
    );

}
export default TextField;
