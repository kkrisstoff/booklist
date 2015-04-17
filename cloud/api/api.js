/**
 *
 *
 */
var express = require('express');
var api = express();

//User
require('cloud/api/user')(api);
//Book
require('cloud/api/book')(api);
//List
require('cloud/api/list')(api);

module.exports = function(){
    return api;
}();