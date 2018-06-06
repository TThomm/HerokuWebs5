
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var cafeSchema = mongoose.Schema({
    name: { type: String, required: true },
    placeid: { type: String, required: false }
});





// create the model for users and expose it to our app
module.exports = mongoose.model('Cafe', cafeSchema);