// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js'); 
const EstablishmentOwner = require('../models/EstablishmentOwnerModel.js'); 

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
        
        const query = {
            username: username,
            password: password
        }; 

        // implement a function to check if the username is in the database, 
        const user = await db.findOne(User, query);

        // Check if user is an owner 
        const establishmentOwner = await db.findOne(EstablishmentOwner, {username: username})
        var ownerEstablishmentId = null;
        if(establishmentOwner) {
            ownerEstablishmentId = establishmentOwner.establishment_id;
        }


        if(!user){
            var data = {
                username : username,
                error_message : 'Invalid username or password!'
            }
            res.render('login', data);

            /* checkUsername(user.username, username);
            checkPassword(user.password, password); */
        }
        else {
            req.session.user = username;
            req.session.owner_establishment_id = ownerEstablishmentId;
            console.log(`Current User: ` + req.session.user);
            console.log(`Establishment Owner ID: ` + req.session.owner_establishment_id);
            res.redirect('/establishments-list');
        }
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