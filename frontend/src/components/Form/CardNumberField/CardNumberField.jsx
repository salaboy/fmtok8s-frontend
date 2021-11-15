import "./CardNumberField.scss";
import React from "react";

import cn from 'classnames';

function CardNumberField({name, label, value1, value2, value3, value4, changeHandler, error, help, reference}) {



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
          ["CardNumberField"]: true

        })}>
        <label>{label}</label>
        <div className="CardNumberField__FieldGroup">
          <input id={name} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="4" value={value1} onChange={changeHandler} ref={reference}/>
          <input id={name+"_2"} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="4" value={value2} onChange={changeHandler} />
          <input id={name+"_3"} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="4" value={value3} onChange={changeHandler} />
          <input id={name+"_4"} type="text" pattern="[0-9]*" inputMode="numeric" maxLength="4" value={value4} onChange={changeHandler} />
        </div>

        {errorElement}
        {helpElement}
      </div>
    );

}
export default CardNumberField;
