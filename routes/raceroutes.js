var express = require('express');
var router = express.Router();
var raceController = require('../controllers/racecontroller');
var User = require('../models/user');

// CHECK IF ADMIN OR LOGGGED IN, BEFORE EACH ROUTE

router.get('/', isLoggedIn, raceController.index);

router.get('/add', isLoggedIn, raceController.addracepage);

router.post('/create', isLoggedIn, isAdmin, raceController.race_create_post);

router.get('/:id', isLoggedIn, raceController.race_detail);

router.get('/name/:name', isLoggedIn, raceController.race_detail_name);

router.get('/:id/cafes', isLoggedIn, raceController.race_cafes);

router.get('/:id/users', isLoggedIn, raceController.race_users);

router.put('/:id', isLoggedIn, isAdmin, raceController.race_update_put);

router.post('/:id', isLoggedIn, isAdmin, raceController.race_update_put);

router.delete('/:id', isLoggedIn, isAdmin, raceController.race_delete);

function isAdmin(req, res, next) {
    User.findById(req.session.passport.user, function (err, response) {
        if (response != null) {
            if (response.admin == true) {
                console.log("This user is admin");
                return next();
            }
            else {
                res.send('You have to be admin to do this action!');
            }
        }
    });
}

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
}

//export this router to use in our index.js
module.exports = router;