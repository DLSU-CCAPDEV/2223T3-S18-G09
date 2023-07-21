/* import modules */
const dotenv = require('dotenv'); // import dotenv module
const express = require('express'); // import express module
const bodyParser = require('body-parser'); // import body-parser module
const routes = require('./routes/routes.js'); // import routes.js module
const mongoose = require('mongoose'); // import module `mongoose`
const hbs = require(`hbs`); // import module `hbs`
const session = require('express-session'); // import module `express-session`
const MongoStore = require('connect-mongo'); // Import connect-mongo and pass the session object

// const mongodb = require('mongodb'); // import mongodb module

// import module `database` from `./model/db.js`
const db = require('./models/db.js');

const app = express(); // create an instance of express

// import module from '../helpers/helpers.js' 
const helper = require('./helpers/helper.js');

app.set('view engine', 'hbs'); // set the view engine to handlebars
app.use(express.static('public')); // configure express to use public folder
app.use(express.static('files'));
app.use(bodyParser.urlencoded({ extended: false })); // configure express to use body-parser
// if the route is not defined in the server, render `../views/error.hbs`

// always define this as the last middleware
// app.use(function (req, res) {
//     res.render('error');
// });

app.use(session({ // Set up session
    'secret': 'palatable-session',
    'resave': false,
    'saveUninitialized': false,
    store: MongoStore.create({ mongoUrl: `mongodb+srv://palatable:QdMeiq5AY79vZke0@cluster0.vgvqiwt.mongodb.net/` }),
    collection: 'sessions'
}));

app.use('/', routes); // configure express to use routes.js

hbs.registerPartials(__dirname + '/views/partials'); // register partials 
hbs.registerHelper('replaceSpaces', helper.replaceSpaceWithHyphen);
hbs.registerHelper('formatDate', helper.formatDate);
hbs.registerHelper('formatNumReview', helper.formatNumReview);

dotenv.config(); // configure dotenv
port = process.env.PORT; // set the port based on the .env file
hostname = process.env.HOSTNAME; // set the hostname based on the .env file

app.listen(port, hostname, function () {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port);
});

// connects to the database
db.connect();

// register helpers
hbs.registerHelper('stars', function (n, block) {
    let filledStars = `<span class="fa fa-star checked"></span>`.repeat(n);
    let emptyStars = `<span class="fa fa-star-o checked"></span>`.repeat(5 - n);
    return filledStars + emptyStars;
});
