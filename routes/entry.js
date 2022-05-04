const express = require('express');
const auth_middleware = require('./middleware/auth_middleware');
const EntryModel = require('./model/entry.model');
const route = express.Router();

const entries = [
    {title: "The Hateful Eight", time: 100, director: "Quentin Tarantino", year: 2015},
    {title: "Star Wars", time: 100, director: "George Lucas", year: 1977},
    {title: "The Godfather", time: 100, director: "Francis Ford Coppola", year: 1972},
];


route.get('/', function(request, response) {

    return EntryModel.getAllEntries()
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.get('/:id', function(request, response) {
    const id = request.params.id

    return EntryModel.getEntryById(id)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})


route.post('/', auth_middleware, function(request, response) {
    const movieTitle = request.body.title;
    const movieDirector = request.body.director;
    const year = request.body.releaseYear;
    const username = request.username;

    if (!movieTitle || !movieDirector || !year) {
        response.status(401).send("Need Title, Director and Year")
    }

    const entry = {
        title: movieTitle,
        director: movieDirector,
        releaseYear: year,
        creator: username
    }

    return EntryModel.createEntry(entry)
        .then(dbResponse => {
            response.status(200).send(dbResponse);
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

route.delete('/', auth_middleware, function(request, response) {
    const id = request.body.id;

    return EntryModel.deleteEntry(id)
        .then(dbResponse => {
            response.status(200).send(dbResponse)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

module.exports = route;