var requireUser = require('cloud/require-user');

module.exports = function(){
    var express = require('express');
    var router = express();

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
