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
                console.log(`Current User: ` + req.session.user);
                console.log(`Establishment Owner ID: ` + req.session.owner_establishment_id);
                res.redirect('/establishments-list');
            } else {
                var data = {
                    username: username,
                    error_message: 'Username and/or Password is incorrect.'
                }
                res.render('login', data);

                /* checkUsername(user.username, username);
                checkPassword(user.password, password); */
            }
        });
    },
}

/* const usernameInput = $('#username-input');
const passwordInput = $('#password-input');

// place the code here later
function checkUsername(query_username, input_username) {
    // implement function to validate username
    // if the username is in the database, add is-valid class to the div
    if (query_username == input_username) {
        // add is-valid class to the div
        usernameInput.addClass('is-valid');
        usernameInput.removeClass('is-invalid');
    } else {
        // add is-invalid class to the div
        usernameInput.addClass('is-invalid');
        usernameInput.removeClass('is-valid');
    }
}

function checkPassword(query_password, input_password) {
    // implement function to validate password
    if (query_password == input_password) {
        // add is-valid class to the div
        passwordInput.addClass('is-valid');
        passwordInput.removeClass('is-invalid');
    } else {
        // add is-invalid class to the div
        passwordInput.addClass('is-invalid');
        passwordInput.removeClass('is-valid');
    }   
}
 */

module.exports = loginController;