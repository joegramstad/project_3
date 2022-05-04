import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';


export default function EntryThread(props) {
    const params = useParams();

    const [title, setTitle] = useState('');
    const [director, setDirector] = useState('');
    const [releaseYear, setYear] = useState('');

    const [reviews, setReviews] = useState([]);


    useEffect(() => {
        Axios.get('/api/entries/' + params.entryID)
            .then(function(response) {
                setTitle(response.data.title);
                setDirector(response.data.director);
                setYear(response.data.releaseYear);
            })
    },[]);

    function getReviews() {
        Axios.get('/api/reviews/' + params.entryID)
            .then(function (response) {
                setReviews(response.data);
            })
    }

    useEffect(getReviews, []);

    const reviewList = [];
    if (reviews.length > 0) {
        for (let review of reviews) {
            reviewList.push(<div>
                <h1>{review.creator}</h1>
                <div> Review: {review.text}</div>
            </div>)
        }
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