// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/UserModel.js`
const Review = require('../models/ReviewModel.js');
const Establishment = require('../models/EstablishmentModel.js');
const OwnerResponse = require('../models/OwnerResponseModel.js');
const User = require('../models/UserModel.js');


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
            var user = await db.findOne(User, { username: item.username });

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
                } : null,
                avatarImagePath: user.avatarImagePath
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
    },

    getWriteReview: async function (req, res) {

        var review = await db.findMany(Review);
        review.sort((a, b) => a.review_id - b.review_id);

        var review_id = review[review.length - 1].review_id + 1; // get highest id and increment by 1
        var username = req.session.user;
        var establishment_id = req.query.establishment_id;
        var title = req.query.title;
        var body_desc = req.query.body_desc;
        var date = Date.now();
        var edited = false;
        var rating = req.query.rating;
        
        var user = await db.findOne(User, { username: username });

        var review = {
            review_id: review_id,
            username: username,
            establishment_id: establishment_id,
            title: title,
            body_desc: body_desc,
            date: date,
            owner_response_id: null,
            edited: edited,
            rating: rating,
            avatarImagePath: user.avatarImagePath,
            votes: {
                numUpvotes: 0,
                numDownvotes: 0,
                upvotes: [],
                downvotes: []
            },
            photos: [], 
            owner_response_id: 0 
          };

        await db.insertOne(Review, review,);
        res.render('partials/review-partial', {
            username: review.username,
            rating: review.rating,
            date: review.date,
            body_desc: review.body_desc,
            title: review.title,
            review_id: review.review_id,
            user: req.session.user, 
            owner_establishment_id: req.session.owner_establishment_id, 
            establishment_id: review.establishment_id,
            avatarImagePath: review.avatarImagePath
            },
           
            function (err, html) {
                if (err) {
                    // Handle the error
                    console.error('Error rendering the partial:', err);
                    res.status(500).send('Error rendering the partial.');
                } else {
                    // No error, continue with rendering
                    // console.log('Rendered HTML:', html);
                    res.send(html);
                }
         });
    },

    getDeleteReview: async function (req, res) {
        await db.deleteOne(Review, {review_id: req.query.review_id});
        res.send(true);
    }
}

module.exports = reviewsController;