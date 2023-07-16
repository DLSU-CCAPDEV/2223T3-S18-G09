
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `signup` paths in the server
*/
const signupController = {

    /*
        executed when the client sends an HTTP GET request `/signup`
        as defined in `../routes/routes.js`
    */
    getSignUp: function (req, res) {
        res.render('signup');
    },

    /*
        executed when the client sends an HTTP POST request `/signup`
        as defined in `../routes/routes.js`
    */
    postSignUp: async function (req, res) {

        /*
            when submitting forms using HTTP POST method
            the values in the input fields are stored in `req.body` object
            each <input> element is identified using its `name` attribute
            Example: the value entered in <input type="text" name="fName">
            can be retrieved using `req.body.fName`
        */
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var username = req.body.username;
        var password = req.body.password;
        var description = req.body.description;

        // avatar
        // description

        var user = {
            first_name: first_name,
            last_name: last_name,
            username: username,
            password: password,
            description: description
        }

        const userQuery = await db.findOne(User, query);

        if (userQuery.username != username) {
            /*
            calls the function insertOne()
            defined in the `database` object in `../models/db.js`
            this function adds a document to collection `users`
            */
            var response = await db.insertOne(User, user);

            if(response != null){
                // res.redirect('/establishments-list?first_name=' + first_name +'&lName=' + lName + '&idNum=' + idNum);
                res.redirect('/login');
            }
            else {
                res.render('error'); // Error, invalid data
            }
        } else {
            res.render('error'); // Error, username already taken
        }

        // if user is found in the database, username is already taken
        

        /*
            upon adding a user to the database,
            redirects the client to `/success` using HTTP GET,
            defined in `../routes/routes.js`
            passing values using URL
            which calls getSuccess() method
            defined in `./successController.js`
        */

        // check if username is already in the database
        // username needs to be unique
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
