module.exports = function(user){

    // Logs in the user
    user.post('/login', function(req, res) {
        var name = req.body.username,
            pass = req.body.password;
        Parse.User.logIn(name, pass, {
            success: function(user) {
                app.locals.user = user.username;
                res.redirect('/home');
            },
            error: function(user, error) {
                res.render('signup', {
                    title: 'Sign Up',
                    page: 'signup',
                    message: error.message
                });
            }
        });
    });

    //Sign up a new user
    user.post('/signup', function(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.signUp(null, {
            success: function(user) {
                res.redirect('/home');
            },
            error: function(user, error) {
                res.render('signup', {
                    title: 'Sign Up',
                    page: 'signup',
                    message: error.message
                });
            }
        });
    });

    // Logs out the user
    user.get('/logout', function(req, res) {
        Parse.User.logOut();
        res.redirect('/');
    });

    // TEST method
    user.delete('/postTest', function(req, res) {
        Parse.User.logOut();
        console.log("##delete");
        res.redirect('/');
    });

};