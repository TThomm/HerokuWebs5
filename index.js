var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
var raceroutes = require('./routes/raceroutes.js');
var caferoutes = require('./routes/caferoutes.js');
var authroutes = require('./routes/authroutes.js');
var mongoose = require('mongoose');
var Cafe = require('./models/cafe');
var Race = require('./models/cafe');
var request = require('request');
var session = require('express-session');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');

var passport = require('passport');
var flash = require('connect-flash');

mongoose.connect('mongodb://localhost/race_db');
require('./config/passport')(passport);

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./routes/authroutes.js')(app, passport);













app.get('/', function (req, res) {
    res.send("Hello world!");
});

app.get('/home', function (req, res) {
    res.render('home.ejs');
});

app.get('/retrieveCafes', function (req, res) {
    var latitude = 51.72512;
    var longitude = 5.30323;
    var caves;
    var call = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyDguC3IklgL1LwV828atdW1lJqbkcRQhpU&location=" + latitude + "," + longitude + "&radius=10000&type=cafe";

    request(call, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        caves = getCafes(body);
        res.send("Retrieved the cafes!");
    });
   
});


function getCafes(json) {

    obj = JSON.parse(json).results;
    var caves = [];

    for (i = 0; i < obj.length; i++) {
        var name = obj[i].name;
        var placeid = obj[i].place_id;
        var rating = obj[i].rating;
        var adress = obj[i].vicinity
        var newCafe = new Cafe();
        newCafe.placeid = placeid;
        newCafe.name = name;
        newCafe.save(function (err, savedCafe) {
            console.log('err', err);
            console.log('savedCafe', savedCafe);
        });
        caves[i] = newCafe;
    }
    return caves;
}


app.use('/races', raceroutes);
app.use('/cafes', caferoutes);





var server = http.listen(port, function(){
    console.log('listening on *:' + port);
});
module.exports = server;
