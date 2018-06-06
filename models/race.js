var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Cafe = require('../models/cafe');
var User = require('../models/user');

// define the schema for our user model
var raceSchema = mongoose.Schema({
    name: { type: String, required: true },
    starttime: { type: String, required: true },
    endtime: { type: String, required: true },
    users: [{ type: mongoose.Schema.ObjectId, required: false, ref: 'User' /* Pseudo-joins */ }],
    cafes: [{ type: mongoose.Schema.ObjectId, required: false, ref: 'Cafe' /* Pseudo-joins */ }]
});

// methods ======================
// generating a hash

raceSchema.path('starttime').validate(function (val) {
    var matches = val.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    if (matches == null) {
        return false;
    }
    return true;
}, 'Bad starttimeformat!');

raceSchema.path('endtime').validate(function (val) {
    var matches = val.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    if (matches == null) {
        return false;
    }
    return true;
}, 'Bad endtimeformat!');


raceSchema.path('users').validate(function (val) {
    var array = val;
    console.log(val)
    var curr = "";
        array.forEach(function (item) {
            User.findById(item._id, function (err, usr) {
                //console.log(caf);
                if (usr == null) {
                    return false;
                }
            });
        });
   
    
    return true;

}, "A User does not exist!");


raceSchema.path('cafes').validate(function (val) {
    var array = val;
    var curr = "";
    array.forEach(function (item) {
        Cafe.findById(item._id, function (err, caf) {
            //console.log(caf);
            if (caf == null) {
                return false;
            }
        });
    });
    return true;

}, "A Cafe does not exist!");



// create the model for users and expose it to our app
module.exports = mongoose.model('Race', raceSchema);
