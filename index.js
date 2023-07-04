/* import modules */
const dotenv = require('dotenv'); // import dotenv module
const express = require('express'); // import express module
const bodyParser = require('body-parser'); // import body-parser module
const routes = require('./routes/routes.js'); // import routes.js module


const app = express(); // create an instance of express

app.set('view engine', 'hbs'); // set the view engine to handlebars
app.use(express.static('public')); // configure express to use public folder
app.use(bodyParser.urlencoded({ extended: false })); // configure express to use body-parser
app.use('/', routes); // configure express to use routes.js

dotenv.config(); // configure dotenv
port = process.env.PORT; // set the port based on the .env file
hostname = process.env.HOSTNAME; // set the hostname based on the .env file

app.listen(port, hostname, function () {
    console.log('Server running at: ');
    console.log('http://' + hostname + ':' + port);
});
