const path = require("path");

const fs = require("fs");

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `Establishment` from `../models/UserModel.js`
const Review = require('../models/ReviewModel.js');
const Establishment = require('../models/EstablishmentModel.js');
const OwnerResponse = require('../models/OwnerResponseModel.js');
const User = require('../models/UserModel.js');
const OwnEst = require('../models/EstablishmentOwnerModel.js');
const OwnRes = require('../models/OwnerResponseModel.js');

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
            var rich = false;
            var ceo = await db.findOne(OwnEst, { username: req.session.user, establishment_id: item.establishment_id });
            if (ceo) {
                rich = true;
            }
            var ownerResponse = await db.findOne(OwnRes, { review_id: item.review_id });
            const owner_response_text = ownerResponse ? ownerResponse.body_desc : null;
            const owner_response_date = ownerResponse ? ownerResponse.date : null;
            const owner_response_id = ownerResponse ? ownerResponse.review_id : null;

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
                votes: item.votes,
                owner_response_id: item.owner_response_id,
                imagePaths: item.imagePaths,
                establishment_name: establishment.name,
                owner_response: ownerResponse ? {
                    body_desc: ownerResponse.body_desc,
                    date: ownerResponse.date
                } : null,
                owner_response_text: '',
                avatarImagePath: user.avatarImagePath,
                edited: item.edited,
                establishment_owner: rich,
                user: req.session.user,
                owner_response_text: owner_response_text,
                owner_response_date: owner_response_date,
                owner_response_id: owner_response_id
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

    postWriteReview: async function (req, res) {
        // Get necessary data from input fields
        var review = await db.findMany(Review);
        var username = req.session.user;
        var establishment_id = req.body.establishment_id;
        var title = req.body.title;
        var body_desc = req.body.body_desc;
        var date = Date.now();
        var edited = false;
        var rating = req.body.rating;

        review.sort((a, b) => a.review_id - b.review_id);
        var review_id = review[review.length - 1].review_id + 1; // get highest id and increment by 1

        var files =  req.files;
        var filesArr = [];
        if (req.files) {
            for (const file of files) {
                const sourcePath = file.path;
                const destinationPath = path.join(__dirname, "..", "files", "images", "user-uploads",`review-photo-` + review_id + `-` + file.originalname);
                const reviewPhotoPath = '../images/user-uploads/' + `review-photo-` + review_id + `-` + file.originalname;
                // Process each file and save it to the destination path
                
                fs.rename(sourcePath, destinationPath, (err) => {
                    if (err) {
                        // console.error('Error renaming file:', err);
                        // Handle the error, e.g., show an error message or log it
                    } else {
                        filesArr.push(reviewPhotoPath);
                    }
                });
            }
        }
        // To get avatar image path
        var user = await db.findOne(User, { username: username });

        // Find establishment that the user will write review for
        var establishment = await db.findOne(Establishment, { establishment_id: establishment_id });
        var total_reviews_counter = establishment.total_reviews;

        // Store in an object
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
            photos: filesArr, 
            owner_response_id: 0,
          };
        
        // Insert to db
        await db.insertOne(Review, review);

        
        // Get new overall rating
        var new_overall_rating = ((establishment.overall_rating * establishment.total_reviews) + Number(rating)) / (total_reviews_counter + 1);

        // Increment total reviews of establishment
        await db.updateOne(Establishment, { establishment_id: establishment.establishment_id }, {total_reviews: total_reviews_counter + 1, overall_rating: new_overall_rating});
        
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
            avatarImagePath: review.avatarImagePath,
            photos: review.photos,
            votes: review.votes
            },
           
            function (err, html) {
                if (err) {
                    console.log(err);
                    // Handle the error
                    // console.error('Error rendering the partial:', err);
                    res.status(500).send('Error rendering the partial.');
                } else {
                    // No error, continue with rendering
                    // console.log('Rendered HTML:', html);
                    res.send(html);
                }
         });
    },

    getDeleteReview: async function (req, res) {
        try {
          var review = await db.findOne(Review, { review_id: req.query.review_id });
          var establishment_id = review.establishment_id;
          var establishment = await db.findOne(Establishment, { establishment_id: establishment_id });
          var total_reviews_counter = establishment.total_reviews;
      
          // Get new overall rating
          var new_overall_rating = ((establishment.overall_rating * establishment.total_reviews) - Number(review.rating)) / (total_reviews_counter - 1);
          
          // Handle divisions by 0
          if (isNaN(new_overall_rating)) {
            new_overall_rating = 0;
          }
      
          await db.deleteOne(Review, { review_id: req.query.review_id});
          var resp = await db.findOne(OwnerResponse, { review_id: req.query.review_id});
          if (resp) {
            await db.deleteOne(OwnerResponse, { review_id: req.query.review_id});
          }
      
          // Decrement total number of reviews and update overall rating
          await db.updateOne(Establishment, { establishment_id: establishment.establishment_id }, { total_reviews: total_reviews_counter - 1, overall_rating: new_overall_rating });
      
          res.send(true);
        } catch (error) {
          // If there's an error, handle it here and return false
          res.send(false);
        }
      },
      

    postUpdateReview: async function (req, res) {
        // Get necessary variables
        var review_id = req.body.review_id;
        var title = req.body.title;
        var body_desc = req.body.body_desc;
        var new_rating = req.body.rating;

        var review = await db.findOne(Review, {review_id: req.body.review_id});
        
        var establishment_id = review.establishment_id;
        var establishment = await db.findOne(Establishment, { establishment_id: establishment_id });
        var user = await db.findOne(User, { username: review.username });
        var old_rating = review.rating;

        var files =  req.files;
        var filesArr = [];
        if (req.files) {
            // Use Promise.all to wait for all fs.rename operations to complete
            await Promise.all(files.map(async (file) => {
                const sourcePath = file.path;
                const destinationPath = path.join(__dirname, "..", "files", "images", "user-uploads", `review-photo-` + review_id + `-` + file.originalname);
                const reviewPhotoPath = '../images/user-uploads/' + `review-photo-` + review_id + `-` + file.originalname;
                
                try {
                    await fs.promises.rename(sourcePath, destinationPath);
                    filesArr.push(reviewPhotoPath);
                } catch (err) {
                    // Handle any errors that occur during file processing
                    console.error('Error renaming file:', err);
                }
            }));
        }

        // Remove previous rating from overall rating 
        var total_reviews_counter = establishment.total_reviews;
        var new_overall_rating = ((establishment.overall_rating * total_reviews_counter) - old_rating + Number(new_rating)) / total_reviews_counter;
        if (isNaN(new_overall_rating)) {
            new_overall_rating = 0;
        }
        // Update in database
        await db.updateOne(Review, {review_id: review_id}, {title: title, body_desc: body_desc, rating: new_rating, edited: true, photos: filesArr});
        await db.updateOne(Establishment, {establishment_id: establishment_id}, {overall_rating: new_overall_rating});
        
        res.render('partials/review-partial', {
            username: review.username,
            rating: new_rating,
            date: review.date,
            body_desc: body_desc,
            title: title,
            review_id: review_id,
            user: req.session.user, 
            owner_establishment_id: req.session.owner_establishment_id, 
            establishment_id: review.establishment_id,
            avatarImagePath: user.avatarImagePath,
            edited: true,
            photos: filesArr
            },
           
            function (err, html) {
                if (err) {
                    // Handle the error
                    // console.error('Error rendering the partial:', err);
                    res.status(500).send(err);
                } else {
                    // No error, continue with rendering
                    // console.log('Rendered HTML:', html);
                    res.send(html);
                }
         });
    },

    getDeleteResponse: async function (req, res) {
        try {
          await db.deleteOne(OwnerResponse, { review_id: req.query.review_id });
          res.send(true);

        } catch (error) {
          res.send(false);
        }
      },

    getUpdateResponse: async function (req, res) {
        try {
            await db.updateOne(OwnerResponse, { review_id: req.query.id }, {body_desc: req.query.text, date: req.query.date});
            res.send(true);
            
          } catch (error) {
            res.send(false);
          }
    },

    getCreateResponse: async function (req, res) {
        try {
            await db.insertOne(OwnerResponse, {review_id: req.query.id, body_desc: req.query.text, date: req.query.date});
            res.send(true);
            
          } catch (error) {
            res.send(false);
          }
    }
}

module.exports = reviewsController;