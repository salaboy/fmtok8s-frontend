import "./Speakers.scss";
import React, {  useState } from "react";
import Speaker from '../../components/Speaker/Speaker'
import cn from 'classnames';
import SalaboyImage from '../../images/salaboy.png'
import AvatarImage from '../../images/avatar.png'

function Speakers() {
    const speakersMock = [
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Salaboy",
            "position": "Staff Engineer @VMware.",
            "image": "../../images/salaboy.png",

            "description": "@Kubernetesio-addict, @KnativeProject fan."
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "AI/ML Engineer",
            "position": "Engineer @PlugTree.",
            "image": "https://i.pravatar.cc/200?u=110",
            "externalImage" : true,
            "description": "Passionate about AI and ML. Training models on the weekends."
        },
        {
            "id": "6a621e56-c7af-4443-9ef4-cf70725c2e57",
            "name": "Doom Guy",
            "position": "Player One @IDSoftware.",
            "image": "https://i.pravatar.cc/200?u=30",
            "externalImage" : true,
            "description": "I used to kill deamons, now I am a patient person. "
        },
        {
            "id": "0016b52d-10f0-4dc3-822a-0c2da3d23c6e",
            "name": "The Trainer",
            "position": "Kubernetes Trainer @LearnK8s",
            "image": "https://i.pravatar.cc/200?u=1140",
            "externalImage" : true,
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
                externalImage={item.externalImage}
                key={index}
              />
          ))}


      </div>
    );

}
export default Speakers;
