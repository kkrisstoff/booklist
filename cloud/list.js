var requireUser = require('cloud/require-user');
var currentUser = requireUser;

var Book = Parse.Object.extend({
    className: "Book",
    title: function() {
        var title = this.get('title') || "Untitled";
        return title;
    }
});

var List = Parse.Collection.extend({
    model: Book
});
var bookList = new List();


module.exports = function() {
    var express = require('express');
    var app = express();

    /**
     * Save New Book
     */
    app.post('/saveBook', function(req, res) {
        console.log("Book Title");
        console.log(req.body.title);
        if (req.body.title) {
            var book = new Book();
            book.set("title", req.body.title);
            book.set("user", currentUser);

            // Set up the ACL so everyone can read the image
            // but only the owner can have write access
            /*var acl = new Parse.ACL();
            acl.setPublicReadAccess(true);
            if (Parse.User.current()) {
                image.set("user", Parse.User.current());
                acl.setWriteAccess(Parse.User.current(), true);
            }
            image.setACL(acl);*/

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
            res.json({ error: 'Add the book\'s title!' });
        }
    });

    // View all saved books
    app.get('/showData', function(req, res) {
        var query = new Parse.Query();

        query.descending("createdAt");

        query.find().then(
            function(objects) {
            res.render('list', {
                data: objects,
                title: "Latest"
            });
        });
    });

    // Shows images you uploaded
    app.get('/mine', requireUser, function(req, res) {
        var query = new Parse.Query(Image);

        query.descending("createdAt");
        query.equalTo("user", Parse.User.current());

        query.find().then(function(objects) {
            res.render('image/list', {
                images: objects,
                title: "My Images"
            });
        });
    });

    // Shows one image
    app.get('/:id', function(req, res) {
        var id = req.params.id;

        // Build the query to find an image by id
        var query = new Parse.Query(Image);
        query.equalTo("objectId", id);
        query.include("imageMetadata");

        query.find().then(function(objects) {
            if (objects.length === 0) {
                res.send("Image not found");
            } else {
                var image = objects[0];

                // Update metadata on image (adds a view)
                Parse.Cloud.run('viewImage', {
                    metadataId: image.get("imageMetadata").id
                }).then(function() {
                        // Render the template to show one image
                        res.render('image/show', {
                            image: image,
                            size: 'sizeNormal',
                            title: image.title()
                        });
                    }, function(error) {
                        res.send("Error: " + error);
                    });
            }
        }, function(error) {
            res.send("Image not found");
        });
    });

    return app;
}();