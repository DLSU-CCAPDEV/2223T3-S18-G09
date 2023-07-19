
const logoutController = {
    getLogOut: function (req, res) {
        /*
            logs-out the current user
            destroys the current values stored in `req.session`
        */
        req.session.destroy(function(err) {
            if(err) throw err;

            /*
                redirects the client to homepage
            */
            res.redirect('/');
        });

    }

}

/*
    exports the object `logoutController` 
*/
module.exports = logoutController;