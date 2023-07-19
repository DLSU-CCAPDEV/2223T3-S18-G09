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
    total_reviews: {
        type: Number,
        required: true 
    }, 
    // for the paths of the static images of an establishment, stored locally
    imagePaths: {
        establishmentPfpPath: String,           // path to the profile picture of the establishment
        establishmentMapPath: String, 
        establishmentHeaderPath: String,        // path to the header picture of the establishment
        establishmentMenuPhotos: [String],      // array of paths to the photos of the establishment, 1 to many
        establishmentFoodPhotos: [String],
    }
});

/*
    exports a mongoose.model object based on `EstablishmentSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `establishments` -> plural of the argument `Establishment`
*/
module.exports = mongoose.model('Establishment', EstablishmentSchema);