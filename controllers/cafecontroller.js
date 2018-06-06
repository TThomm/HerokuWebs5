var Cafe = require('../models/cafe');
var express = require('express');
var app = express();
var ieks = exports;


exports.index = function (req, res) {
    Cafe.find(function (err, response) {
        cafes = response;
        console.log(cafes);
        if(req.headers['real-type'] != null)
        {
            res.send(cafes);
        }
        else{
            res.render('cafes.ejs', {
                cafes: cafes
            })
        }
    });
};

exports.addcafepage = function (req, res) {
        res.render('addcafe.ejs')

};

exports.cafe_detail = function (req, res) {
    if (req.params.id.length == 24) {
        Cafe.findById(req.params.id, function (err, response) {
            if (response != null) {

                res.send(response);
            }
            else {
                message = "Cafe " + req.params.id + " does not exist!";
                sendMessage(message, req, res);
            }
        });
    }
    else {
        message = "Bad id!";
        sendMessage(message, req, res);
    }
};

exports.cafe_detail_name = function (req, res) {
    Cafe.findOne({ 'name': req.params.name }, function (err, response) {
        if (response == null) {
            message = "Cafe " + req.params.name + " does not exist!";
            sendMessage(message, req, res);
        }
        else {
            res.send(response);
        }
    });
};

exports.cafe_update_put = function (req, res) {
    console.log(req.params.id);
    // use our bear model to find the bear we want
    if (req.params.id.length == 24) {
        Cafe.findById(req.params.id, function (err, cafe) {
            if (cafe != null) {
                if (err) {
                    res.send(err);
                    return;
                }

                if (req.body.placeid != null) {
                    cafe.placeid = req.body.placeid;
                }
                if (req.body.name != null) {
                    cafe.name = req.body.name;
                }
                // update the bears info
                // save the bear
                cafe.save(function (err) {
                    if (err) {
                        res.send(err);
                    }
                    else {
                        console.log(req.get('real-type'));
                        if (req.get('real-type') != null) {

                            res.json({ message: 'Cafe updated!' });

                        }
                        else {
                            res.redirect('/cafes');

                        }
                    }

                });
            }
            else {
                message = "Cafe " + req.params.id + " does not exist!";
                sendMessage(message, req, res);
            }
            

        });
    }
    else {
        message = "Bad id!";
        sendMessage(message, req, res);
    }
    

}

exports.cafe_delete = function (req, res) {
    Cafe.remove({
        _id: req.params.id
    }, function (err, cafe) {
        if (err) {

            res.send(err);
        }
        else {
            if (req.get('real-type') != null) {
                res.json({ message: 'Successfully deleted' });
            }
            else {
                ieks.index(req, res)
            }
        }

    });
};


exports.cafe_create_post = function (req, res){
    var cafeInfo = req.body; //Get the parsed information
   
    if(!cafeInfo.name){
        res.render('show_message', {
            message: "Sorry, you provided wrong info", type: "error"});
    } else {
        var newCafe = new Cafe({
            name: cafeInfo.name,
            placeid: cafeInfo.placeid
        });
		
        newCafe.save(function(err, cafe){
            if(err)
                res.send("Database error");
            else
                if (req.get('real-type') != null) {
                    res.json({ message: 'New Cafe added' });
                }
                else {
                    // io.emit('addedCafe', { cafedata:cafe });
                    res.redirect('/cafes');
                }
        });
    }
}

function sendMessage(message, req, res){
    if (req.get('real-type') != null) {
        res.json({ message: message });
    }
    else {
        res.json({ message: message });
    }
}

