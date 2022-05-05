import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router';
import './styles/EntryThread.css';


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

    function editReview(reviewID) {
        Axios.put('/api/reviews/' + reviewID, {text: text, entry: entryID, username: username})
            .then(response => {
                navigate('/entry/' + entryID)
            })
            .catch(error => console.log(error));
    }

    function deleteReview(reviewID) {
        Axios.delete('/api/reviews/' + reviewID)
            .then(response => {
                navigate('/entry/' + entryID)
            })
            .catch(error => console.log(error));
    }

    const reviewList = [];
    if (reviews.length > 0) {
        for (let review of reviews) {
            if (username === review.creator) {
                reviewList.push(<div>
                    <h4>Reviewer: {review.creator}</h4>
                    <div className={'review'}> {review.text} </div>
                    <button className={'changeButton'} onClick={() => editReview(review._id)}> Edit </button>
                    <button className={'changeButton'} onClick={() => deleteReview(review._id)}> Delete </button>
                </div>)
            } else {
                reviewList.push(<div>
                    <h4> Reviewer: {review.creator}</h4>
                    <div className={'review'}> {review.text} </div>
                </div>)
            }

        }
    }

    function createReview() {
        Axios.post('/api/reviews/', {text: text, entry: entryID, username: username})
            .then(response => {
                navigate('/entry/' + entryID)
            })
            .catch(error => console.log(error));
    }

    if (username.length > 0) {
        return (
            <div>
                <div className={'titleBox'}>
                <h1>
                    {title}
                </h1>
                <h3>
                    Director: {director}
                </h3>
                <h3>
                    Year: {releaseYear}
                </h3>
                </div>
                <div id={'threadContainer'}> {reviewList} </div>
                <div className={'postReview'}>
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
            <div className={'titleBox'}>
                <h1>
                    {title}
                </h1>
                <h3>
                    Director: {director}
                </h3>
                <h3>
                    Year: {releaseYear}
                </h3>
            </div>
            <div id={'threadContainer'}> {reviewList} </div>
        </div>
    )

}