import "./TextArea.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function TextArea({name, label, value, changeHandler, error, help}) {

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
          ["TextArea"]: true,

        })}>
        <label>{label}</label>
        <textarea name={name} id={name} value={value} onChange={changeHandler}></textarea>
        {errorElement}
        {helpElement}
      </div>
    );

}
export default TextArea;
