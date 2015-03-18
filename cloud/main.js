require('cloud/app.js');

//Cloud Functions
Parse.Cloud.define("showMyBooks", function(request, response) {
//    var list = require('cloud/modules/book-list'),
//        titles = list.findList({
//            user: request.params.user,
//            type: request.params.books
//        });
//    response.success(titles);
    var query = new Parse.Query("Book"),
        currentUser = request.params.user;
    if (request.params.books == "my" && currentUser){
        query.equalTo("user", currentUser);
    }
    query.find({
        success: function(results) {
            console.log(results);
            var title,
                titles = [],
                i;
            for (i=0; results[i]; i++){
                title = results[i].get("title");
                titles.push(title);
            }
            response.success(titles);
        },
        error: function() {
            response.error("movie lookup failed");
        }
    });
});

