// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `ownerresponses`
var OwnerResponseSchema = new mongoose.Schema({
    review_id: {
        type: Number,
        required: true
    },
    body_desc: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

/*
    exports a mongoose.model object based on `OwnerResponseSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `ownerresponses` -> plural of the argument `OwnerResponse`
*/
module.exports = mongoose.model('OwnerReponse', OwnerResponseSchema);