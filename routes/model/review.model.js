const mongoose = require('mongoose');

const ReviewSchema = require('../schema/entry.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewByEntryId(entryID) {
    return ReviewModel.findById(entryID).exec();
}

function deleteReview(id) {
    return ReviewModel.deleteOne({
        _id: id
    }).exec();
}

module.exports = {
    createReview,
    deleteReview,
    getReviewByEntryId,
}