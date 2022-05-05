import React, { useEffect, useState } from 'react';

import Axios from 'axios';
import {useNavigate} from "react-router";

function App() {

    const navigate = useNavigate();
    const [entries, setEntries] = useState([]);

    function getEntries() {
        Axios.get('api/entries/')
            .then(function (response) {
            setEntries(response.data);
            })
    }

    function editEntry(id) {
            navigate('/entry/edit/' + id);
        // Axios.put('api/entries/')
        //     .then(response=> {
        //     console.log(response.data);
        //     })
    }

    function deleteEntry(id) {
        Axios.delete('api/entries/' + id)
            .then(response => {
                console.log(response.data);
            })

        Axios.delete('api/reviews/', {data: {id: id}})
            .then(response => {
                console.log(response.data);
            })
    }

    useEffect(getEntries, []);

    const entryList = [];
    for (let entry of entries) {
        entryList.push(<div>
        <a href={'entry/' + entry._id}><h1>{entry.title}</h1></a>
        <span> Director: {entry.director}</span>
        <span> Release Year: {entry.releaseYear}</span>
        <button onClick={() => editEntry(entry._id)}> Edit </button>
        <button onClick={() => deleteEntry(entry._id)}> Delete </button>
        </div>)

    }

    return (<div> {entryList} </div>)

}

export default App;
