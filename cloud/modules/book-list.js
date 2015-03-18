
exports.findList = function(options) {
    var query = new Parse.Query("Book"),
        currentUser = options.user,
        searchType = options.type || "all";
    if (searchType == "my" && currentUser){
        query.equalTo("user", currentUser);
    }
    console.log("##query");
    console.log(query);
    query.find({
        success: function(results) {
            console.log("##results");
            console.log(results);
            var title,
                titles = [],
                i;
            for (i=0; results[i]; i++){
                title = results[i].get("title");
                titles.push(title);
            }
            console.log("##titles");
            console.log(titles);
            return titles;
        },
        error: function(err) {
            console.log("##error");
            console.log(err);
            return new Error(err);
        }
    });
};
