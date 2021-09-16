import "./Speakers.scss";
import React, { useEffect, useState, useContext, useRef } from "react";
import Speaker from 'components/Speaker/Speaker'
import cn from 'classnames';


function Speakers() {
    const speakersMock = [
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Salaboy",
            "position": "Staff Engineer @VMware.",
            "image": "salaboy.png",
            "description": "@Kubernetesio-addict, @KnativeProject fan."
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "AI/ML Engineer",
            "position": "Engineer @PlugTree.",
            "image": "avatar.png",
            "description": "Passionate about AI and ML. Training models on the weekends."
        },
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Doom Guy",
            "position": "Player One @IDSoftware.",
            "image": "avatar.png",
            "description": "I used to kill deamons, now I am a patient person. "
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "The Trainer",
            "position": "Kubernetes Trainer @LearnK8s",
            "image": "avatar.png",
            "description": "Teaching people about Kubernetes since before Kubernetes was a thing."
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
                authorImage={item.image}
                key={index}
              />
          ))}


      </div>
    );

}
export default Speakers;
