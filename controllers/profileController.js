// import module `database` from `../models/db.js`
const path = require("path");
const fs = require("fs");

const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const Review = require('../models/ReviewModel.js');

const Establishment = require('../models/EstablishmentModel.js');
const { redirectRoot } = require('./controller.js');

//password hashing
const bcrypt = require('bcrypt');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

const profileController = {

    // this is for rendering the profile page
    getUpdateProfile: async function (req, res) {
        const currentUser = req.session.user;
        var userQuery = { username: currentUser };
        var userProjection = {
            first_name: 1,
            last_name: 1,
            username: 1,
            description: 1,
            avatarImagePath: 1,
            bannerImagePath: 1
        }
        var userResult = await db.findOne(User, userQuery, userProjection);
        var details = {
            first_name: userResult.first_name,
            last_name: userResult.last_name,
            user: userResult.username,  //from username to user to make navbar work
            description: userResult.description,
            avatarImagePath: userResult.avatarImagePath,
            bannerImagePath: userResult.bannerImagePath
        }
        
        res.render('update-profile', details);
    },

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

        if (userResult == null) {
            error = {
                code: 404,
                error: 'User does not exist...'
            }
            res.render('error', error); 
            return
        }

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
        //var oldhash = bcrypt.hashSync(req.body.oldPassword, salt);
        var newhash = bcrypt.hashSync(req.body.newPassword, salt);

        var userQuery = { username: currentUser };
        var userResult = await db.findOne(User, userQuery); 
        var noDup = await db.findOne(User, {username: req.body.username}, {username: 1});

        var files =  req.files;
        // console.log(req.files);
        var pathName1 = userResult.avatarImagePath;
        var pathName2 = userResult.bannerImagePath;

        // console.log(pathName1);
        // console.log(pathName2);

        if (req.files) {
            // PFP
            if(req.files.avatar && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
                var sourcePath1 = req.files.avatar[0].path;
                var destinationPath1 = path.join(__dirname, "..", "files", "images", "user-uploads",`pfp-` + req.files.avatar[0].originalname);
                var pathName1 = '../images/user-uploads/' + `pfp-` + req.files.avatar[0].originalname;
                
                fs.rename(sourcePath1, destinationPath1, (err) => {
                    if (err) {
                        // console.error('Error renaming file:', err);
                        // Handle the error, e.g., show an error message or log it
                    } else {
                        
                    }
                });
            }

            if(req.files.banner && Array.isArray(req.files.banner) && req.files.banner.length > 0){
                var sourcePath2 = req.files.banner[0].path;
                var destinationPath2 = path.join(__dirname, "..", "files", "images", "user-uploads",`pfp-` + req.files.banner[0].originalname);
                var pathName2 = '../images/user-uploads/' + `pfp-` + req.files.banner[0].originalname;
                
                fs.rename(sourcePath2, destinationPath2, (err) => {
                    if (err) {
                        // console.error('Error renaming file:', err);
                        // Handle the error, e.g., show an error message or log it
                    } else {
                        
                    }
                });
            }
        }

        var results = bcrypt.compareSync(req.body.oldPassword, userResult.password);
        if (noDup && !noDup.username == currentUser){
            console.log('Username Already Exists!');
        }
        else if(results || req.body.oldPassword == ""){
            var updatePassword = newhash;
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

            const updateData = await db.updateOne(User,{username: userResult.username},update);
            req.session.user = req.body.username;
            req.session.save();
        }
        else {
            console.log('Incorrect Password');
        }
        res.send(true);
    },

    checkUser: async function (req,res) {
        const currentUser = req.query.username;
        var userQuery = { username: currentUser };
        var userResult = await db.findOne(User, userQuery, {username:1});
        res.send(userResult);
    }
};

module.exports = profileController;