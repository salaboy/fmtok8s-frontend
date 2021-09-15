import "./Speakers.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import axios from 'axios'
import Speaker from 'components/Speaker/Speaker'
import Element from 'components/Element/Element'
import cn from 'classnames';

function Speakers() {
    const speakersMock = [
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Salaboy",
            "position": "Staff Engineer @VMware.",
            "image": "imagefile.png",
            "description": "Curabitur sed tempor velit. Morbi libero dui, porttitor congue egestas eget, lacinia quis ligula. Curabitur dui lorem, suscipit tempor porttitor sed, lobortis ut nulla."
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "AI/ML Engineer",
            "position": "Engineer @Apple.",
            "image": "imagefile.png",
            "description": "Curabitur sed tempor velit. Morbi libero dui, porttitor congue egestas eget, lacinia quis ligula. Curabitur dui lorem, suscipit tempor porttitor sed, lobortis ut nulla.Curabitur sed tempor velit. Morbi libero dui, porttitor congue egestas eget, lacinia quis ligula. Curabitur dui lorem, suscipit tempor porttitor sed, lobortis ut nulla."
        },
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Salaboy",
            "position": "Staff Engineer @VMware.",
            "image": "imagefile.png",
            "description": "Curabitur sed tempor velit. "
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "AI/ML Engineer",
            "position": "Engineer @Apple.",
            "image": "imagefile.png",
            "description": "Curabitur sed tempor velit. Morbi libero dui, porttitor congue egestas eget, lacinia quis ligula. Curabitur dui lorem, suscipit tempor porttitor sed, titor sed, lobortis ut nulla."
        }

    ]
    const [speakerItems, setSpeakerItems] = useState(speakersMock) // state hook

    // useEffect(() => {                           // side effect hook
    //
    //     axios({
    //       "method": "GET",
    //       "url": "/agenda/", // This is going throw the proxy in package.json
    //       "headers": {
    //
    //       }, "params": {
    //
    //       }
    //     })
    //     .then((response) => {
    //       setAgendaItems(response.data)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }, [setAgendaItems])

    return (
      <div className={  cn({
          ["Speakers"]: true,
        })}>

          {speakerItems && speakerItems.map((item,index)=>(
              <Speaker
                name={item.name}
                position={item.position}
                description={item.description}
                authorImage={item.authorImage}
                key={index}
              />
          ))}


      </div>
    );

}
export default Speakers;
