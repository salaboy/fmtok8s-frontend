import React from "react";
import { useInView } from 'react-intersection-observer';
import "./Element.scss";

function Element({children, time, threshold, customClass, fixed, inline, delay, once, inlineblock} ) {
    //ANIMATION TIME AND DELAY AS STYLE
    var styleElement;
    var timeElement;
    var delayElement
    if(time){
      timeElement = time;
    }else {
      timeElement = .5;
    }
    if(delay){
      delayElement = delay;
    }else {
      delayElement = 0.2;
    }
    styleElement = { transitionDuration:  timeElement+'s', transitionDelay: delayElement+'s' }


    //THRESHOLD
    var thresholdElement
    if(threshold){
      thresholdElement = threshold
    }else {
      thresholdElement = 0.1
    }

    //ONCE ELEMENT
    var onceElement
    if(once){
      onceElement = true
    }else {
      onceElement = false
    }

    const [ref, inView] = useInView({
      threshold: thresholdElement,
      triggerOnce: onceElement
    });

    //CUSTOM CLASS AND OTHER CLASSES
    var customClassElement;
    if(customClass){
      customClassElement = customClass + " " + (fixed ? " --fixed" : "") + (inline ? " --inline" : "");
    }else {
      customClassElement = " " + (fixed ? " --fixed" : "") + (inline ? " --inline" : "") + (inlineblock ? " --inlineblock" : "");
    }





    return (
      <div className={inView ? "Element --visible " + customClassElement : "Element " + customClassElement} ref={ref} style={ inView ? styleElement : {}} >
        {children}
      </div>
    );

}
export default Element;
