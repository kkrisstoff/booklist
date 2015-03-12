module.exports = function(){
    var express = require('express');
    var app = express();

    //Render the login page
    app.get('/login', function(req, res) {
        var currentUser = Parse.User.current();
        if (currentUser) {
            res.redirect('/home');
        } else {
            res.render('login', {
                title: 'Log In',
                page: 'login'
            });
        }
    });

    // Logs in the user
    app.post('/login', function(req, res) {
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

    //Render the signup page
    app.get('/signup', function(req, res) {
        res.render('signup', {
            title: 'Log In',
            page: 'signup',
            message: ""
        });
    });
    //Sign up a new user
    app.post('/signup', function(req, res) {
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
    app.get('/logout', function(req, res) {
        Parse.User.logOut();
        res.redirect('/');
    });


    // TEST method
    app.delete('/postTest', function(req, res) {
        Parse.User.logOut();
        console.log("##delete");
        res.redirect('/');
    });


    return app;
}();