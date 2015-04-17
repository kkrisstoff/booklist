/**
 *
 *
 */
var app = app || {};

(function ($) {
    'use strict';

    app.AddNewItem = Backbone.View.extend({
        events: {
            //"submit": "onSubmit",
            "click #saveItem": "onSubmit",
            "change input[type=file]": "uploadFile"
            //"click .upload": "showFile"
        },

        initialize: function() {
            var self = this;
            this.fileUploadControl = this.$el.find("input[type=file]")[0];
        },

        showFile: function(e) {
            this.fileUploadControl.click();
            return false;
        },

        onSubmit: function () {
            console.log("onSubmit clicked");
            var $form = this.$el.find("form"),
                title = $form.find("#title").val(),
                author = $form.find("#author").val(),
                description = $form.find("#description").val(),
                imageFile = this.fileUploadControl.files[0];
            console.log(title, author, description);

            $form.submit();
        },

        uploadFile: function() {
            var self = this;

            if (this.fileUploadControl.files.length > 0) {
                //this.$(".upload").html("Uploading <img src='/images/spinner.gif' />");
                var file = this.fileUploadControl.files[0];
                var name = "image.jpg";
                var parseFile = new Parse.File(name, file);

                // First, we save the file using the javascript sdk
                parseFile.save().then(function() {
                    // The file has been saved to Parse.
                }, function(error) {
                    // The file either could not be read, or could not be saved to Parse.
                });
            } else {
                alert("Please select a file");
            }
            return false;
        },

        render: function () {

        }
    });



})(jQuery);
