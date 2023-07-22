// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    description: String,        // this will contain the description of the user to be placed as the bio in the profile page 
    avatarImagePath: String,    // this will contain the path of the image file uploaded by the user 
    bannerImagePath: String,    // this will contain the path of the image file uploaded by the user
    location: String,           // this will contain the location of the user
    joined: Date                // this will contain the location of the user 
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);