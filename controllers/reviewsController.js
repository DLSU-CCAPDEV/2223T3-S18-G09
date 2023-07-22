// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/UserModel.js`
const Review = require('../models/ReviewModel.js');
const Establishment = require('../models/EstablishmentModel.js');
const OwnerResponse = require('../models/OwnerResponseModel.js');

const reviewsController = {
    getSearchReviews: async function (req, res) {
        var search = req.query.search; // Retrieve search query

        var query = {
            $or: [
                { title: { $regex: new RegExp(`\\b${search}\\b`, 'i') } },
                { body_desc: { $regex: new RegExp(`\\b${search}\\b`, 'i') } }
            ]
          }; // Query for searching in the database


        var result = await db.findMany(Review, query);

        // Process the result 
        var reviews = await Promise.all(result.map(async (item) => {
            var establishment = await db.findOne(Establishment, { establishment_id: item.establishment_id });
            var ownerResponse = await db.findOne(OwnerResponse, { review_id: item.review_id });

            return {
                review_id: item.review_id,
                username: item.username,
                establishment_id: item.establishment_id,
                title: item.title,
                body_desc: item.body_desc,
                date: item.date,
                edited: item.edited,
                rating: item.rating,
                photos: item.photos,
                owner_response_id: item.owner_response_id, 
                establishment_name: establishment.name,
                owner_response: ownerResponse ? {
                    body_desc: ownerResponse.body_desc,
                    date: ownerResponse.date
                } : null
            };
        }));
        
        var owner_establishment_id = req.session.owner_establishment_id;
        // Load search page
        res.render('search-reviews', {
            reviews: reviews,
            results_count: reviews.length,
            search_value: search,
            user: req.session.user,
            search_flag: true,
            owner_establishment_id: owner_establishment_id
          });
    }


}

module.exports = reviewsController;