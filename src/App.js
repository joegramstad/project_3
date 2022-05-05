import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import {useNavigate} from "react-router";
import './styles/App.css';

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
        <a href={'entry/' + entry._id}><h3>{entry.title}</h3></a>
            <div className={'info'}> <b>Director:</b> {entry.director}</div>
        <div className={'info'}> <b>Release Year:</b> {entry.releaseYear}</div>
        <button className={'changeButton'} onClick={() => editEntry(entry._id)}> Edit </button>
        <button className={'changeButton'} onClick={() => deleteEntry(entry._id)}> Delete </button>
        </div>)

    }

    return (
        <div>
            <h1 id={'pageTitle'}> Movie Entries </h1>
            <div id={'entryContainer'}> {entryList} </div>
        </div>
    )

}

export default App;
