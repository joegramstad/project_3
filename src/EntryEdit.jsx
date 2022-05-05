import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router';
import './styles/EntryCreate.css';

export default function EntryEdit(props) {
    const params = useParams();

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [releaseYear, setYear] = useState('');

    function getEntry() {
        Axios.get('/api/entries/' + params.entryID)
            .then(response => {
                setTitle(response.data.title);
                setDirector(response.data.director);
                setYear(response.data.releaseYear);
            })
            .catch(error => console.log(error));
    }

    useEffect(getEntry, [])

    function editEntry() {
        Axios.put('/api/entries/' + params.entryID, {title: title, director: director, year: releaseYear})
            .then(response => {
                navigate('/')
            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1 id={'pageTitle'}>Edit Movie Entry</h1>
            <div className={'createBox'}>
            <h5>
                Movie Title
            </h5>
            <input value={title} onChange={e => setTitle(e.target.value)} />
            <h5>
                Director
            </h5>
            <input value={director} onChange={e => setDirector(e.target.value)} />
            <h5>
                Release Year
            </h5>
            <input type={"number"} value={releaseYear} onChange={e => setYear(e.target.value)} />

            <button onClick={editEntry}>
                Edit Movie Entry
            </button>
            </div>
        </div>

    )


}