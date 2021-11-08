import "./CardExpirationField.scss";
import React, { useEffect, useState, useContext, useRef } from "react";

import cn from 'classnames';

function CardExpirationField({name, label, month, year, changeHandler, error, help, reference}) {



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
          ["CardExpirationField"]: true

        })}>
        <label>{label}</label>
        <div className="CardExpirationField__FieldGroup">
          <input id={name} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="2" value={month} onChange={changeHandler} ref={reference} placeholder="MM"/>
          <input id={name+"_year"} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="4" value={year} onChange={changeHandler} placeholder="YYYY" />

        </div>

        {errorElement}
        {helpElement}
      </div>
    );

}
export default CardExpirationField;
