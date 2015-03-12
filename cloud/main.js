require('cloud/app.js');

//Cloud Functions
Parse.Cloud.define("showMyBooks", function(request, response) {
    var query = new Parse.Query("Book");
    //query.equalTo("movie", request.params.movie);
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

