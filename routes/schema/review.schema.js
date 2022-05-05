const Schema = require('mongoose').Schema;

const ReviewSchema = new Schema({
    text: String,
    entryID: String,
    creator: String,
    commentDate: {
        type: Date,
        default: Date.now,
    },
}, {
    collection: 'review',
})

module.exports = ReviewSchema;