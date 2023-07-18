// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/UserModel.js`
const Establishment = require('../models/EstablishmentModel.js');

const establishmentController = {
    getEstablishments: async function (req, res) {
        var result = await db.findMany(Establishment, {});

        if (result.length > 0) {
            var establishments = result.map((item) => {
                return {
                  name: item.name,
                  description: item.description,
                  overall_rating: item.overall_rating,
                  total_reviews: item.total_reviews
                }});
            res.render('establishments-list', {
                establishments: establishments
              });
        }

        /*
            if there is no establishments
        */
        else {
            res.render('error');
        }
    }
}
module.exports = establishmentController;