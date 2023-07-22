// import module `database` from `../models/db.js`
const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Review = require('../models/ReviewModel.js');

const profileController = {
    getProfile: async function (req, res) {

    },

    // this is for rendering the profile page
    getUpdateProfile: function (req, res) {
        res.render('update-profile');
    },

    // there should be another for submitting the form and shit
    // postUpdateProfile: function (req, res) {}

    getUserProfileOverview: async function (req, res) {
        const currentUser = req.session.user;

        var userQuery = { username: currentUser };

        var userProjection = {
            first_name: 1,
            last_name: 1,
            location: 1,
            avatarImagePath: 1,
            description: 1,
            location: 1,
            joined: 1,
            bannerImagePath: 1
        }

        var userResult = await db.findOne(User, userQuery, userProjection);

        /* TODO: get the number of reviews from the user using findMany in the Review Collections */
        var reviewQuery = { username: currentUser }

        var reviewProjection = {
            username: 1
        }

        var reviewResult = await db.findMany(Review, reviewQuery, reviewProjection);

        var reviewCount = reviewResult.length;

        var details = {
            first_name: userResult.first_name,
            last_name: userResult.last_name,
            location: userResult.location,
            avatarImagePath: userResult.avatarImagePath,
            bannerImagePath: userResult.bannerImagePath,
            description: userResult.description,
            location: userResult.location,
            joined: userResult.joined,

            reviewCount: reviewCount
        }

        res.render('user-profile-overview', details);
    },

    getUserProfileReviews: async function (req, res) {
        const currentUser = req.session.user;

        var userQuery = { username: currentUser };

        var userProjection = {
            first_name: 1,
            last_name: 1,
            location: 1,
            avatarImagePath: 1,
            description: 1,
            location: 1,
            joined: 1,
            bannerImagePath: 1
        }

        var userResult = await db.findOne(User, userQuery, userProjection);

        /* TODO: get the number of reviews from the user using findMany in the Review Collections */
        var reviewQuery = { username: currentUser }


        var reviewResult = await db.findMany(Review, reviewQuery);

        var reviewCount = reviewResult.length;

        var details = {
            first_name: userResult.first_name,
            last_name: userResult.last_name,
            location: userResult.location,
            avatarImagePath: userResult.avatarImagePath,
            bannerImagePath: userResult.bannerImagePath,
            description: userResult.description,
            location: userResult.location,
            joined: userResult.joined,

            reviewCount: reviewCount,
            reviews: reviewResult

        }


        res.render('user-profile-reviews', details);
    },
};

module.exports = profileController;