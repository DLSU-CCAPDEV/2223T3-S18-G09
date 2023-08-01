const db = require('./models/db.js');

const User = require('./models/UserModel.js');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

const usernames = []; // insert usernames here

db.connect();

async function encryptAccounts() {
    for (var i = 0; i < usernames.length; i++) {
        var username = usernames[i];

        var result = await db.findOne(User, { username: username });

        console.log(result);

        var password = result.password;

        if (result) {
            await hashPassword(username, password);
        }
    }
}

async function hashPassword(username, password) {
    bcrypt.hash(password, saltRounds, async function (err, hash) {

        var flag = await db.updateOne(User, { username: username }, { password: hash });

        console.log('Hashed pw for ' + username + ' ' + hash);
    });
}


encryptAccounts();
