// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `reviews`
var ReviewSchema = new mongoose.Schema({
    review_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    establishment_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body_desc: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    edited: {
        type: Boolean
    },
    rating: {
        type: Number
    },
    votes: {
        numUpvotes: Number,
        numDownvotes: Number,
        upvotes: [String], // Array of usernames 
        downvotes: [String] // Array of usernames (Strings)
        },
    photos: [String],  // Array of file path
    owner_response_id: {
        type: Number,
        required: true
    }
});

/*
    exports a mongoose.model object based on `ReviewSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `reviews` -> plural of the argument `Review`
*/
module.exports = mongoose.model('Review', ReviewSchema);