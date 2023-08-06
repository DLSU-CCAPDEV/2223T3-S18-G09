// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/UserModel.js`
const Establishment = require('../models/EstablishmentModel.js');

const Review = require('../models/ReviewModel.js');

const helper = require('../helpers/helper.js');

const User = require('../models/UserModel.js');

const OwnRes = require('../models/OwnerResponseModel.js');

const OwnEst = require('../models/EstablishmentOwnerModel.js');

const establishmentController = {
    getEstablishments: async function (req, res) {
        var result = await db.findMany(Establishment, {});

        if (result.length > 0) {
            var establishments = result.map((item) => {
                return {
                    name: item.name,
                    description: item.description,
                    overall_rating: item.overall_rating,
                    total_reviews: item.total_reviews,
                    establishmentPfpPath: item.imagePaths.establishmentPfpPath,
                }
            });

            const user = req.session.user ? req.session.user : null;
            // console.log(req.session.username); 
            res.render('establishments-list', {
                establishments: establishments,
                user: user
            });
        }
        /*
            if there is no establishments
        */
        else {
            res.render('error');
        }
    },

    getSearchEstablishments: async function (req, res) {
        var search = req.query.search; // Retrieve search query

        var query = {
            $or: [
                { name: { $regex: new RegExp(`\\b${search}\\b`, 'i') } },
                { description: { $regex: new RegExp(`\\b${search}\\b`, 'i') } }
            ]
        }; // Query for searching in the database

        var result = await db.findMany(Establishment, query);

        // Process the result 
        var establishments = result.map((item) => {
            return {
                name: item.name,
                description: item.description,
                overall_rating: item.overall_rating,
                total_reviews: item.total_reviews,
                establishmentPfpPath: item.imagePaths.establishmentPfpPath,
            }
        });

        // Load search page
        res.render('search-establishments', {
            establishments: establishments,
            results_count: establishments.length,
            search_value: search,
            user: req.session.user

        });
    },

    getEstablishmentPage: async function (req, res) {
        var establishmentNameStr = req.params.establishmentName;

        var query = {
            name: helper.replaceHyphenWithSpace(establishmentNameStr)
        }

        var result = await db.findOne(Establishment, query);
        
        if (result == null) {
            error = {
                code: 404,
                error: 'Establishment does not exist...'
            }
            res.render('error', error); 
            return
        }

        console.log(result.establishment_id);

        var reviewQuery = {
            establishment_id: result.establishment_id
        }



        var result2 = await db.findMany(Review, reviewQuery);

        // console.log(JSON.stringify(result2));

        var reviews = result2.map((item) => {
            return {
                review_id: item.review_id,
                username: item.username,
                establishment_id: item.establishment_id,
                title: item.title,
                body_desc: item.body_desc,
                date: item.date,
                edited: item.edited,
                rating: item.rating,
                votes: item.votes,
                photos: item.photos,
                owner_response_text: '',
                user: req.session.user
                // imagePaths array from the query
                // avatarImagePath: await db.findOne(User, { username: item.username }, { avatarImagePath: 1 })
            }
        });
        var rich = false;
        var ceo = await db.findOne(OwnEst, { username: req.session.user, establishment_id: result.establishment_id });
        if (ceo) {
            rich = true;
        }
        /* append a new property, avatarImagePath */
        for (let i = 0; i < reviews.length; i++) {
            var avatarImagePath = await db.findOne(User, { username: reviews[i].username }, { avatarImagePath: 1 });
            var ownerResponse = await db.findOne(OwnRes, { review_id: reviews[i].review_id });
            reviews[i].avatarImagePath = avatarImagePath.avatarImagePath;
            if (ownerResponse) {
                reviews[i].owner_response_text = ownerResponse.body_desc;
                reviews[i].owner_response_date = ownerResponse.date;
                reviews[i].owner_response_id = ownerResponse.review_id;
            }
            reviews[i].establishment_owner = rich;
        }

        // console.log(reviews[0].establishment_id);
        /* check if its added */
        /* for (let i = 0; i < reviews.length; i++) {
            console.log(reviews[i].avatarImagePath);
        } */

        if (result != null) {
            var details = {
                establishment_id: result.establishment_id,
                name: result.name,
                description: result.description,
                overall_rating: result.overall_rating,
                total_reviews: result.total_reviews,
                contact: result.contact,
                address: result.address,
                edited: result.edited,

                // imagePaths array from the query
                // contains paths to pfp, header, map, menu, and gallery images
                // access using imagePaths.establishmentPfpPath, etc.
                // access menu images using imagePaths.establishmentMenuPhotos[0], etc.
                establishmentHeaderPath: result.imagePaths.establishmentHeaderPath,
                establishmentMapPath: result.imagePaths.establishmentMapPath,

                establishmentMenuPhotos: result.imagePaths.establishmentMenuPhotos, // array
                establishmentFoodPhotos: result.imagePaths.establishmentFoodPhotos, // array

                // reviews array from the query
                reviews: reviews,
                user: req.session.user,

                Monday: result.establishmentTime.Monday,
                Tuesday: result.establishmentTime.Tuesday,
                Wednesday: result.establishmentTime.Wednesday,
                Thursday: result.establishmentTime.Thursday,
                Friday: result.establishmentTime.Friday,
                Saturday: result.establishmentTime.Saturday,
                Sunday: result.establishmentTime.Sunday
            };

            console.log(
                'From establishment controller: ' + details.user
            );

            /* console.log(details.name);
            console.log(details.description);
            console.log(details.overall_rating);
            console.log(details.reviews[0].username); */
            res.render('establishment-page', details);
        } else {
            res.render('error', { error: 'Establishment not found.' });
        }
    }
}


module.exports = establishmentController;