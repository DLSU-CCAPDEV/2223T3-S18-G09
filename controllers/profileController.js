// import module `database` from `../models/db.js`
const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Review = require('../models/ReviewModel.js');

const Establishment = require('../models/EstablishmentModel.js');
const { redirectRoot } = require('./controller.js');

const profileController = {
    getProfile: async function (req, res) {

    },

    // this is for rendering the profile page
    getUpdateProfile: async function (req, res) {
        const currentUser = req.session.user;
        var userQuery = { username: currentUser };
        var userProjection = {
            first_name: 1,
            last_name: 1,
            username: 1,
            description: 1
        }
        var userResult = await db.findOne(User, userQuery, userProjection);
        var details = {
            first_name: userResult.first_name,
            last_name: userResult.last_name,
            username: userResult.username,
            description: userResult.description
        }
        
        res.render('update-profile', details);
    },

    // there should be another for submitting the form and shit
    // postUpdateProfile: function (req, res) {}

    getUserProfileOverview: async function (req, res) {
        const currentUser = req.session.user;
        //const currentUser = 'uwah';

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

        var reviewResult = await db.findMany(Review, reviewQuery);

        /* add the establishment_name to the reviews */

        var reviews = reviewResult.map((item) => {
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
            }
        });

        for (let i = 0; i < reviewResult.length; i++) {
            var establishmentQuery = await db.findOne(Establishment, { establishment_id: reviewResult[i].establishment_id }, { name: 1 });
            reviews[i].establishment_name = establishmentQuery.name;
        }

        var reviewCount = reviewResult.length;

        var details = {
            currentPage: 'profile',
            first_name: userResult.first_name,
            last_name: userResult.last_name,
            location: userResult.location,
            avatarImagePath: userResult.avatarImagePath,
            bannerImagePath: userResult.bannerImagePath,
            description: userResult.description,
            joined: userResult.joined,

            reviewCount: reviewCount,
            reviews: reviews,
            user: req.session.user
        }

        res.render('user-profile-overview', details);
    },

    getUpdate: async function (req,res) {
        const currentUser = req.session.user;
        var userQuery = { username: currentUser };
        var userResult = await db.findOne(User, userQuery, {password: 1, username: 1});
        var noDup = await db.findOne(User, {username: req.query.username}, {username: 1});


        if (noDup && !noDup.username == currentUser){
            console.log('Username Already Exists!');
        }
        else if(userResult.password == req.query.oldPassword || req.query.oldPassword == ""){
            var updatePassword = req.query.newPassword;
            
            if (req.query.newPassword == "" || req.query.oldPassword == ""){
                updatePassword = userResult.password;
            }

            var update = {
                first_name: req.query.first_name,
                last_name: req.query.last_name,
                username: req.query.username,
                description: req.query.description,
                password: updatePassword
            }
            const updateData = await db.updateOne(User,{username: userResult.username},update);
            req.session.user = req.query.username;
            req.session.save();
            //i have no clue how to redirect it back to user-profile
            //res.render('user-profile-overview');
        }
        else {
            console.log('Incorrect Password');
        }
    }
};

module.exports = profileController;