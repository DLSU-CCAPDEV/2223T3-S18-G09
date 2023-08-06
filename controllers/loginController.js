// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const EstablishmentOwner = require('../models/EstablishmentOwnerModel.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');

/* 
    defines an object which contains functions executed as callback 
    when a client requests for `login` paths in the server 
*/
const loginController = {
    getLogIn: function (req, res) {
        res.render('login');
    },

    /*
        executed when the client sends an HTTP POST request `/postLogin`
        as defined in `../routes/routes.js`
    */
    postLogin: async function (req, res) {
        var username = req.body.username;
        var password = req.body.password;

        /* const query = {
            username: username,
            password: password
        };  */

        // implement a function to check if the username is in the database, 
        const result = await db.findOne(User, { username: username });

        // send an error message if the user is not found in the database
        if (!result) {
            var data = {
                username: username,
                error_message: 'Username and/or Password is incorrect.'
            }
            res.render('login', data);

            return;
        }

        // Check if user is an owner 
        const establishmentOwner = await db.findOne(EstablishmentOwner, { username: username })
        var ownerEstablishmentId = null;
        if (establishmentOwner) {
            ownerEstablishmentId = establishmentOwner.establishment_id;
        }

        /*
            use compare() method of module `bcrypt`
            to check if the password entered by the user
            is equal to the hashed password in the database
        */
        bcrypt.compare(password, result.password, function (err, equal) {
            if (equal) {
                req.session.user = username;
                req.session.owner_establishment_id = ownerEstablishmentId;

                console.log(req.body.rememberMe);

                // Set maxAge to three weeks if rememberMe is enabled
                if (req.body.rememberMe !== undefined) {
                    console.log("Remembered");
                    req.session.cookie.maxAge = 3 * 7 * 24 * 60 * 60 * 1000; // 3 weeks in milliseconds
                }

                console.log(`Current User: ` + req.session.user);
                console.log(`Establishment Owner ID: ` + req.session.owner_establishment_id);
                res.redirect('/establishments-list');
            } else {
                var data = {
                    username: username,
                    error_message: 'Username and/or Password is incorrect.'
                }
                res.render('login', data);
            }
        });
    },
}

module.exports = loginController;