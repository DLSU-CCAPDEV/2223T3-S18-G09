const express = require('express');
const app = express();
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');
const establishmentController = require('../controllers/establishmentController.js');
const profileController = require('../controllers/profileController.js');
const reviewsController = require('../controllers/reviewsController.js');
const votingController = require('../controllers/votingController.js');

const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const validation = require('../helpers/validation.js');

app.get('/', controller.getRoot);
/* app.get('/*', controller.redirectRoot); */ // if not yet signed in always redirect to login page 

app.get('/establishments-list', establishmentController.getEstablishments);
app.get('/home*', controller.getHome);

// app.get('/establishment-page', controller.getEstablishmentPage);
// handle page requests from the server
app.get('/establishment-page/:establishmentName', establishmentController.getEstablishmentPage);

app.get('/search-establishments', establishmentController.getSearchEstablishments);
app.get('/search-reviews', reviewsController.getSearchReviews);

// for the sign-up routes
// app.get('/signup', controller.getSignUp);
app.get('/signup', signupController.getSignUp);
app.post('/signup', /* validation.signupValidation, */ upload.single("file"), signupController.postSignUp);

app.get('/update-profile', profileController.getUpdateProfile);
app.get('/user-profile-overview/:username', profileController.getUserProfileOverview);

// for the login routes
app.get('/login', loginController.getLogIn);
app.post('/login', loginController.postLogin);

app.get('/logout', logoutController.getLogOut);

// For ajax
app.get(`/delete-review`, reviewsController.getDeleteReview);
app.post(`/update-review`, upload.array('files'), reviewsController.postUpdateReview);
app.post(`/write-review`, upload.array('files'), reviewsController.postWriteReview);
app.post(`/update-2db`, upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'banner', maxCount: 1 }
]), profileController.postUpdate);
app.get(`/getUser`, profileController.checkUser);

app.get('/upvote', votingController.getUpvote);
app.get('/downvote', votingController.getDownvote);


app.get(`/delete-response`, reviewsController.getDeleteResponse);
app.get(`/update-response`, reviewsController.getUpdateResponse);
app.get(`/create-response`, reviewsController.getCreateResponse);

// new additions
app.get('/getCheckUsername', signupController.getCheckUsername)

// for encrypting the passwords of existing users in the database before we have implemented the hashing function
app.get('/encryptPassword',);

//Error
app.get('/*', controller.getError);

module.exports = app;