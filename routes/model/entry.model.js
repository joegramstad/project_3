const mongoose = require('mongoose');

const EntrySchema = require('../schema/entry.schema');

const EntryModel = mongoose.model("Entry", EntrySchema);

function createEntry(entry) {
    return EntryModel.create(entry);
}

function getAllEntries() {
    return EntryModel.find().exec();
}

function deleteEntry(id) {
    return EntryModel.deleteOne({
        _id: id
    }).exec();
}

function getEntryById(id) {
    return EntryModel.findById(id).exec();
}

module.exports = {
    createEntry,
    deleteEntry,
    getAllEntries,
    getEntryById,
}