// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `establishmentowners`

var EstablishmentOwnerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    establishment_id: {
        type: Number,
        required: true
    }
});

/*
    exports a mongoose.model object based on `EstablishmentOwnerSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `establishmentowners` -> plural of the argument `EstablishmentOwner`
*/
module.exports = mongoose.model('EstablishmentOwner', EstablishmentOwnerSchema);