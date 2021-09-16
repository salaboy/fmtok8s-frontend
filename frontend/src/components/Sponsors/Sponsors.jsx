import "./Sponsors.scss";
import React, {useEffect, useState, useContext, useRef} from "react";
import axios from 'axios'
import Sponsor from 'components/Sponsor/Sponsor'
import Element from 'components/Element/Element'
import cn from 'classnames';

function Sponsors() {

    const sponsorsMock = [
        {
            "Id": "123",
            "Name": "LearnK8s",
            "ImagePath": "kubernetes.png",

        },
        {
            "Id": "456",
            "Name": "Knative",
            "ImagePath": "kubernetes.png",

        },
        {
            "Id": "789",
            "Name": "Kubernetes",
            "ImagePath": "kubernetes.png",

        }
    ]

    const [sponsorsItem, setSponsorsItem] = useState(sponsorsMock) // state hook

    // useEffect(() => {                           // side effect hook
    //
    //     axios({
    //         "method": "GET",
    //         "url": "/sponsors/", // This is going throw the proxy in package.json
    //         "headers": {}, "params": {}
    //     })
    //         .then((response) => {
    //             setSponsorsItem(response.data)
    //         })
    //         .catch((error) => {
    //             console.log(error)
    //         })
    // }, [sponsorsItem])


    return (
        <div className={cn({
            ["Sponsors"]: true,
        })}>

            {sponsorsItem && sponsorsItem.map((item, index) => (
                <Sponsor
                    name={item.Name}
                    imagePath={item.ImagePath}
                    id={item.Id}
                />
            ))}
            {
                sponsorsItem && sponsorsItem.length == 0 && (
                    <span>No sponsors yet.</span>
                )
            }


        </div>
    );

}

export default Sponsors;
