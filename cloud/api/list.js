var requireUser = require('cloud/require-user');

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

module.exports = function(list) {

    //GET list page
    list.get('/list', requireUser, function(req, res) {
        var bookList = new List();
        var books = [];
        bookList.fetch({
            success: function(data) {
                data.each(function(item) {
                    books.push(item);
                });
//                console.log("#list");
//                console.log(books);
                res.render('list', {
                    title: 'Book List',
                    page: 'list',
                    books: books
                });
            },
            error: function(collection, error) {
                console.log("Error: " + error.code + ", " + error.message);
                // The collection could not be retrieved.
            }
        });

    });

    //Filter Books
    list.post('/myBooks', function (req, res) {
        var query = new Parse.Query(Book);

        query.equalTo("user", Parse.User.current());

        query.find().then(function(books) {
            res.render('/list', {
                title: 'Book List',
                page: 'list',
                books: books
            });
        });
    });

};