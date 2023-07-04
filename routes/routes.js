const express = require('express');
const app = express();
const controller = require('../controllers/controller.js');

/* app.get('/profile/:username', controller.getProfile);  */ // use this later on 

app.get('/', controller.getRoot);
app.get('/login', controller.redirectRoot);
/* app.get('/*', controller.redirectRoot); */ // if not yet signed in always redirect to login page

app.get('/establishments-list', controller.getHome);
app.get('/home*', controller.getHome);

app.get('/establishment-page', controller.getEstablishmentPage);
app.get('/search-establishments', controller.getSearchEstablishments);
app.get('/search-reviews', controller.getSearchReviews);

app.get('/signup', controller.getSignUp);
app.get('/update-profile', controller.getUpdateProfile);
app.get('/user-profile-overview', controller.getUserProfileOverview);
app.get('/user-profile-reviews', controller.getUserProfileReviews);

module.exports = app;