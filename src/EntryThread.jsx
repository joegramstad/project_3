import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';


// http://localhost:3000/home/625fcade9c10f6ba1d10faeb
export default function EntryThread(props) {

    const [home, setHome] = useState(undefined);
    const params = useParams();

    useEffect(() => {
        Axios.get('/api/home/' + params.homeId)
            .then(function(response) {
                setHome(response.data);
            })
    },[]);

    if (!home) {
        return (<div>
            Home loading...
        </div>)
    }

    return (
        <div>
            <h1>
                Address: {home.address}
            </h1>
            <h2>
                Build Date: {home.builtDate}
            </h2>
        </div>
    )

}