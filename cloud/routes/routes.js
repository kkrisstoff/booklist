var requireUser = require('cloud/require-user');

var express = require('express');
var router = express();

module.exports = function(){

    //Define all the endpoints
    router.get('/', function(req, res) {
        res.redirect('/login');
    });

    /* GET index page. */
    router.get("/index",  function(req, res) {

        res.render('index', {
            title: 'Log In',
            page: 'index'
        });
    });

    // GET login page
    router.get('/login', function(req, res) {
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

    // GET signup page
    router.get('/signup', function(req, res) {
        res.render('signup', {
            title: 'Log In',
            page: 'signup',
            message: ""
        });
    });

    /* GET home page. */
    router.get("/home", requireUser, function(req, res) {

        res.render('home', {
            title: 'Home',
            page: 'home'
        });
    });

    return router;
}();

//todo: use it
/* GET error page. */
exports.error = function(req, res) {
    res.render('error', {
        title: 'Error'
    });
};
