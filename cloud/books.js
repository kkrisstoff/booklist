var requireUser = require('cloud/require-user');

module.exports = function() {
    var express = require('express');
    var app = express();

    var Book = Parse.Object.extend("Book", {
        className: "Book",
        title: function() {
            var title = this.get('title') || "Untitled";
            return title;
        }
    });

    var List = Parse.Collection.extend({
        model: Book
    });

    //Save New Book
    app.post('/saveNewBook', function(req, res) {
        var currentUser = Parse.User.current().get('username') || "unknown user",
            title = req.body.title,
            author = req.body.author || "",
            description = req.body.description || "",
            img;

        if (req.body.title) {
            var book = new Book();
            book.set("title", req.body.title);
            book.set("author", req.body.author);
            book.set("description", req.body.description);
            book.set("user", currentUser);

            // Set up the ACL so everyone can read
            // but only the owner can have write access
            var acl = new Parse.ACL();
            acl.setPublicReadAccess(true);
            if (Parse.User.current()) {
                //book.set("user", Parse.User.current());
                acl.setWriteAccess(Parse.User.current(), true);
            }
            book.setACL(acl);

            // Save the image and return some info about it via json
            book.save().then(
                function() {
                    res.redirect('/list');
                },
                function(error) {
                    res.json({ error: error });
                }
            );
        } else {
            return res.json({ error: 'Add the book\'s title!' });
        }
    });

    //GET list page
    app.get('/list', requireUser, function(req, res) {
        var bookList = new List();
        var books = [];
        bookList.fetch({
            success: function(data) {
                data.each(function(item) {
                    books.push(item);
                });
                console.log("#list");
                console.log(books);
                res.render('list', {
                    title: 'Book List',
                    page: 'list',
                    books: books
                });
            },
            error: function(collection, error) {
                console.log("Error: " + error.code + " " + error.message);
                // The collection could not be retrieved.
            }
        });

    });

    //Filter Books
    app.post('/myBooks', function (req, res) {
        var query = new Parse.Query(Image);

        query.descending("createdAt");
        query.equalTo("user", Parse.User.current());

        query.find().then(function(objects) {
            res.render('/list', {
                images: objects,
                page: 'list',
                title: "My Images"
            });
        });
    });

    app.get('/list/details', requireUser, function(req, res) {
        res.render('/details', {
            page: 'details',
            title: "Details"
        });
        // Build the query to find an image by id

//        var query = new Parse.Query('List');
//        query.equalTo("objectId", id);
//
//        query.find().then(
//            function(objects) {
//                if (objects.length === 0) {
//                    res.send("Image not found");
//                } else {
//                   console.log(objects);
//                }
//            },
//            function(error) {
//                res.send("Image not found");
//            }
//        );
    });

    return app;
}();