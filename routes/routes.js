const express = require('express');
const app = express();
const controller = require('../controllers/controller.js');
const signupController = require('../controllers/signupController.js');
const loginController = require('../controllers/loginController.js');
const logoutController = require('../controllers/logoutController.js');
const establishmentController = require('../controllers/establishmentController.js');

/* app.get('/profile/:username', controller.getProfile);  */ // use this later on 

app.get('/', controller.getRoot);
/* app.get('/*', controller.redirectRoot); */ // if not yet signed in always redirect to login page

app.get('/establishments-list', establishmentController.getEstablishments);
app.get('/home*', controller.getHome);

// app.get('/establishment-page', controller.getEstablishmentPage);
// handle page requests from the server
app.get('/establishment-page/:establishmentName', establishmentController.getEstablishmentPage);

app.get('/search-establishments', establishmentController.getSearchEstablishments);
app.get('/search-reviews', controller.getSearchReviews);

// for the sign-up routes
app.get('/signup', controller.getSignUp);
app.post('/signup', signupController.postSignUp);

app.get('/update-profile', controller.getUpdateProfile);
app.get('/user-profile-overview', controller.getUserProfileOverview);
app.get('/user-profile-reviews', controller.getUserProfileReviews);

// for the login routes
app.get('/login', controller.redirectRoot);
app.post('/login', loginController.postLogin);

app.get('/logout', logoutController.getLogOut);

module.exports = app;