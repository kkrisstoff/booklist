var express = require('express');

var parseExpressHttpsRedirect = require('parse-express-https-redirect');
var parseExpressCookieSession = require('parse-express-cookie-session');

Parse.initialize("yCCMB1KnjjbAY7WeORqyN2F7Lb8thMvTxKWEXpHe", "bVWLWGXufyGpz8OYODYs5Am0m89UWrNrJZ6oASO5");

var app = express();

// App configuration
app.set('views', 'cloud/views');  //Specify the folder to find templates
app.set('view engine', 'ejs');    //Set the template engine

//Middleware
app.use(parseExpressHttpsRedirect());   // Automatically redirect non-secure urls to secure ones
app.use(express.bodyParser());          //reading request body
app.use(express.methodOverride());      //todo: why isn't works?
//cookie
app.use(express.cookieParser('SECRET_SIGNING_KEY'));
app.use(parseExpressCookieSession({
    fetchUser: true,
    key: 'app.sess',
    cookie: {
        maxAge: 3600000 * 24
    }
}));

//Rotes
app.use(require('cloud/routes/routes'));

//User
var user = require('cloud/user');

//todo: do use this way if it needs
app.use('/', user);
app.use('/', require('cloud/books'));

// Attach the Express app to Cloud Code.
app.listen();