// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `establishments`
var EstablishmentSchema = new mongoose.Schema({
    establishment_id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    overall_rating: {
        type: Number,
        required: true
    },
    menu: [String], //Array of file path
    photos: [String] //Array of file path
});

/*
    exports a mongoose.model object based on `EstablishmentSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `establishments` -> plural of the argument `Establishment`
*/
module.exports = mongoose.model('Establishment', EstablishmentSchema);