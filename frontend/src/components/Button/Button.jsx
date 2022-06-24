import { Component } from "react";
import "./Button.scss";
import React from "react";
import cn from 'classnames';
import { NavLink} from 'react-router-dom'


function Button({children, link, external, inline, clickHandler, small, main, disabled, inverted, state}) {

    var buttonElement;
    if(link){
      if(external){
        buttonElement = <a href={link} target="_blank">  <span>{children}</span> </a>
      }else {
        buttonElement = <NavLink to={link}>  <span>{children}</span> </NavLink>
      }
    }else {
      if(clickHandler){
        buttonElement = <div className="__container" onClick={clickHandler}> <span>{children}</span>  </div>
      }else {
        buttonElement = <div className="__container">  <span>{children}</span> </div>
      }
    }

    return (
      <div className={  cn({
          ["Button"]: true,
          ["--inline"]: inline,
          ["--small"]: small,
          ["--main"]: main,
          ["--disabled"]: disabled,
          ["--inverted"]: inverted,
          ["--active"]: state === "active",
          ["--inactive"]: state === "inactive",

        })}>
            {buttonElement}
      </div>
    );

}
export default Button;
