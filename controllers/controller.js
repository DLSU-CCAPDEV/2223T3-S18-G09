const controller = {
    /* current home page is establishments-list */
    getHome: function (req, res) {
        res.render('establishments-list');
    },

    redirectRoot: function (req, res) {
        res.redirect('/');
    },

    /* login page will be the root */
    getRoot: function (req, res) {
        res.render('login');
    },

    getError: function (req, res) {
        res.render('error', {error: ERROR});    
    }

    /* guide 
        checkAcct: function (req, res) {
        var email = req.body.user_email;
        var password = req.body.user_pw;

        // res.send(email + ' ' + password);
        res.render('profile', { email: email });
    }
    */
};

module.exports = controller;