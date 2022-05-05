import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router';


export default function EntryThread(props) {
    const navigate = useNavigate();
    const params = useParams();
    const entryID = params.entryID

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [releaseYear, setYear] = useState('');
    const [username, setUsername] = useState('');
    const [reviews, setReviews] = useState([]);
    const [text, setText] = useState('');



    useEffect(() => {
        Axios.get('/api/entries/' + params.entryID)
            .then(function(response) {
                setTitle(response.data.title);
                setDirector(response.data.director);
                setYear(response.data.releaseYear);
            })
    },[]);

    function getUser() {
        Axios.get('/api/user/isLoggedIn')
            .then(function (response) {
                setUsername(response.data.username);
            })
    }

    function getReviews() {
        Axios.get('/api/reviews/' + params.entryID)
            .then(function (response) {
                setReviews(response.data);
            })
    }

    useEffect(getUser);
    useEffect(getReviews, []);

    const reviewList = [];
    if (reviews.length > 0) {
        for (let review of reviews) {
            if (username === review.creator) {
                reviewList.push(<div>
                    <h1>{review.creator}</h1>
                    <div> Review: {review.text}</div>
                    {/*<button onClick={}> Edit </button>*/}
                    {/*<button onClick={}> Delete </button>*/}
                </div>)
            } else {
                reviewList.push(<div>
                    <h1>{review.creator}</h1>
                    <div> Review: {review.text}</div>
                </div>)
            }

        }
    }

    // <a href={'entry/' + entry._id}><h1>{entry.title}</h1></a>

    function createReview() {
        console.log(text)
        console.log(params.entryID)
        console.log(username)
        Axios.post('/api/reviews/', {text: text, entry: entryID, username: username})
            .then(response => {
                navigate('/entry/' + entryID)
            })
            .catch(error => console.log(error));
    }



    if (username.length > 0) {
        return (
            <div>
                <h1>
                    Title: {title}
                </h1>
                <h2>
                    Director: {director}
                </h2>
                <h2>
                    Year: {releaseYear}
                </h2>
                <div> {reviewList} </div>
                <div>
                    <h5>
                        Review Text
                    </h5>
                    <input value={text} onChange={e => setText(e.target.value)} />
                    <button onClick={createReview}>
                        Post Review
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <h1>
                Title: {title}
            </h1>
            <h2>
                Director: {director}
            </h2>
            <h2>
                Year: {releaseYear}
            </h2>
            <div> {reviewList} </div>
        </div>
    )

}