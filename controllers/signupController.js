const db = require('../models/db.js');

const User = require('../models/UserModel.js');

const path = require("path");

const fs = require("fs");



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
        // var avatarImagePath = '../images/default-user-images/default-avatar.png';

        if (!req.file) {
            return res.status(400).json({ message: "No file received." });
        }

        const sourcePath = req.file.path;
        const destinationPath = path.join(__dirname, "..", "files", "images", "user-uploads", req.file.originalname);

        const avatarImagePath = '../images/user-uploads/' + req.file.originalname;

        fs.rename(sourcePath, destinationPath, async (error) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ message: "File transfer failed." });
            }

            /* put the database querying here to add the filename to the database */

            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            var username = req.body.username;
            var password = req.body.password;
            var description = req.body.description;
            var joined = new Date();
            // var avatarImagePath = avatarImagePath;
            var location = 'Somewhere';
            var bannerImagePath = '../images/default-user-images/default-banner.jpg';

            /* check if the user is unique */
            var userQuery = { username: username };

            var userProjection = {
                username: 1
            }

            var userResult = await db.findOne(User, userQuery, userProjection);

            if (userResult == null) {

                var user = {
                    first_name: first_name,
                    last_name: last_name,
                    username: username,
                    password: password,
                    description: description,
                    joined: joined,
                    avatarImagePath: avatarImagePath,
                    bannerImagePath: bannerImagePath,
                    location: location
                }

                await db.insertOne(User, user);

                res.json({ success: true });

            } else {
                res.json({ success: false });
            }
        });

    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = signupController;
