const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');
const ReviewModel = require('./model/review.model');

const route = express.Router();

route.get('/:id', function(request, response) {
    const id = request.params.id

    return ReviewModel.getReviewByEntryId(id)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.put('/:id', function(request, response) {
    const id = request.params.id
    const reviewText = request.body.text;
    const entry = request.body.entry;

    const review = {
        text: reviewText,
        entryID: entry,
    }

    return ReviewModel.changeReview(id, review)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.delete('/:id', auth_middleware, function(request, response) {
    const id = request.params.id;

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
    const username = request.body.username;

    console.log(request.body.text)
    console.log(request.body.entry)
    console.log(request.body.username)

    if (!reviewText) {
        response.status(401).send("No Text Provided")
    }

    const review = {
        text: reviewText,
        entryID: entry,
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