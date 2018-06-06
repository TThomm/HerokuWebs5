var express = require('express');
var router = express.Router();
var cafeController = require('../controllers/cafecontroller');
var User = require('../models/user');

router.get('/', cafeController.index);

router.get('/add', isLoggedIn, isAdmin, cafeController.addcafepage);

router.post('/create', cafeController.cafe_create_post);

router.get('/:id', cafeController.cafe_detail);

router.get('/name/:name', cafeController.cafe_detail_name);

router.put('/:id', cafeController.cafe_update_put);

router.post('/:id', isLoggedIn, isAdmin, cafeController.cafe_update_put);

router.delete('/:id', cafeController.cafe_delete);

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