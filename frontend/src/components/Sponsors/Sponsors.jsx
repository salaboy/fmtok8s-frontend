import "./Sponsors.scss";
import React, { useState } from "react";

import Sponsor from '../../components/Sponsor/Sponsor'
import KubernetesImage from '../../images/kubernetes.png'
import cn from 'classnames';

function Sponsors() {

    const sponsorsMock = [
        {
            "Id": "123",
            "Name": "LearnK8s",
            "ImagePath": "../../images/kubernetes.png",

        },
        {
            "Id": "456",
            "Name": "Knative",
            "ImagePath": "../../images/kubernetes.png",

        },
        {
            "Id": "789",
            "Name": "Kubernetes",
            "ImagePath": "../../images/kubernetes.png",

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
