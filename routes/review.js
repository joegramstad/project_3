const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');
const ReviewModel = require('./model/review.model');

const route = express.Router();

const entries = [
    {text: "The Hateful Eight"},
    {title: "Star Wars"},
    {title: "The Godfather"},
];

route.get('/', function(request, response) {
    const id = request.body.id;

    return ReviewModel.getReviewByEntryId(id)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.delete('/', auth_middleware, function(request, response) {
    const id = request.body.id;

    return ReviewModel.deleteReview(id)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.post('/', auth_middleware, function(request, response) {
    const reviewText = request.body.text;
    const entry = request.body.entry;
    const username = request.username;

    if (!reviewText) {
        response.status(401).send("No Text Provided")
    }

    const review = {
        text: reviewText,
        entry: entry,
        creator: username
    }

    return ReviewModel.createReview(review)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})



module.exports = route;