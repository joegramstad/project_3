const Schema = require('mongoose').Schema;

const EntrySchema = new Schema({
    title: String,
    director: String,
    releaseYear: Number,
    creator: String,
    entryDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'entry',
})

module.exports = EntrySchema;