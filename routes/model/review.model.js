const mongoose = require('mongoose');

const ReviewSchema = require('../schema/review.schema');

const ReviewModel = mongoose.model("Review", ReviewSchema);

function createReview(review) {
    return ReviewModel.create(review);
}

function getReviewByEntryId(id) {
    return ReviewModel.find({entryID: id}).exec();
}

function deleteReview(id) {
    return ReviewModel.deleteOne({
        _id: id
    }).exec();
}

function changeReview(id, review) {
    return ReviewModel.updateOne(
        {_id: id},
        {text: review.text, entryID: review.entryID}).exec();
}

module.exports = {
    createReview,
    deleteReview,
    getReviewByEntryId,
    changeReview
}