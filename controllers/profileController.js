// import module `database` from `../models/db.js`
const path = require("path");
const fs = require("fs");

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
            user: userResult.username,  //from username to user to make navbar work
            description: userResult.description
        }
        
        res.render('update-profile', details);
    },

    // there should be another for submitting the form and shit
    // postUpdateProfile: function (req, res) {}

    getUserProfileOverview: async function (req, res) {
        const currentUser = req.session.user;

        var urlQuery = req.params.username;

        if (urlQuery == currentUser) {
            var userQuery = { username: currentUser };
        } else {
            var userQuery = { username: urlQuery };
        }
        
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

        /*
        var reviewProjection = {
            username: 1
        }
        */

        var reviewResult = await db.findMany(Review, userQuery);

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
            username: urlQuery,
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

    postUpdate: async function (req,res) {
        const currentUser = req.session.user;
        var userQuery = { username: currentUser };
        var userResult = await db.findOne(User, userQuery);
        var noDup = await db.findOne(User, {username: req.body.username}, {username: 1});

        var files =  req.files;

        var pathName1 = userResult.avatarImagePath;
        var pathName2 = userResult.bannerImagePath;

        // console.log(pathName1);
        // console.log(pathName2);

        if (req.files) {
            // PFP
            if(files[0]){
                var sourcePath1 = files[0].path;
                var destinationPath1 = path.join(__dirname, "..", "files", "images", "user-uploads",`pfp-` + files[0].originalname);
                var pathName1 = '../images/user-uploads/' + `pfp-` + files[0].originalname;
                
                fs.rename(sourcePath1, destinationPath1, (err) => {
                    if (err) {
                        // console.error('Error renaming file:', err);
                        // Handle the error, e.g., show an error message or log it
                    } else {
                        
                    }
                });
            }

            if(files[1]){
                var sourcePath2 = files[1].path;
                var destinationPath2 = path.join(__dirname, "..", "files", "images", "user-uploads",`pfp-` + files[1].originalname);
                var pathName2 = '../images/user-uploads/' + `pfp-` + files[1].originalname;
                
                fs.rename(sourcePath2, destinationPath2, (err) => {
                    if (err) {
                        // console.error('Error renaming file:', err);
                        // Handle the error, e.g., show an error message or log it
                    } else {
                        
                    }
                });
            }
        }

        if (noDup && !noDup.username == currentUser){
            console.log('Username Already Exists!');
        }
        else if(userResult.password == req.body.oldPassword || req.body.oldPassword == ""){
            var updatePassword = req.body.newPassword;
            
            if (req.body.newPassword == "" || req.body.oldPassword == ""){
                updatePassword = userResult.password;
            }

            var update = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                description: req.body.description,
                password: updatePassword,
                avatarImagePath: pathName1,
                bannerImagePath: pathName2
            }

            // console.log(update);

            const updateData = await db.updateOne(User,{username: userResult.username},update);
            req.session.user = req.body.username;
            req.session.save();
            //i have no clue how to redirect it back to user-profile
            //res.render('user-profile-overview');
        }
        else {
            console.log('Incorrect Password');
        }
        res.send(true);
    }
};

module.exports = profileController;