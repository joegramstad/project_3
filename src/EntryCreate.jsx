import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router';

export default function EntryCreate(props) {


    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [releaseYear, setYear] = useState('');

    function createEntry() {
        Axios.post('/api/entries', {title, director, releaseYear})
            .then(response => {
                console.log("Created user");
                console.log(response.data);
                navigate('/');

            })
            .catch(error => console.log(error));
    }

    return (
        <div>
            <h1>Create Movie Entry</h1>
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

            <button onClick={createEntry}>
                Create Movie Entry
            </button>
        </div>

    )


}