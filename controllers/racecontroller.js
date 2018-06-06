var Race = require('../models/race');
var Cafe = require('../models/cafe');
var User = require('../models/user');
var ieks = exports;

exports.index = function (req, res) {
    if(req.headers['real-type'] != null) {
        Race.find(function (err, response) {
            res.send(response);
        });
    }
    else{
        var races;
        var cafes;
        var users;
        Race.find(function (err, response) {
            races = response;

            User.find(function (err, response2) {
                users = response2;

                Cafe.find(function (err, response3) {
                    cafes = response3;
                    res.render('races.ejs', {
                        races: races,
                        users: users,
                        cafes: cafes
                    })
                });
            });
        });
    }
};


exports.addracepage = function (req, res) {

    var cafes;
    var users;

        User.find(function (err, response2) {
            users = response2;

            Cafe.find(function (err, response3) {
                cafes = response3;
                res.render('addrace.ejs', {
                    users: users,
                    cafes: cafes
                })
            });
        });

};

exports.race_detail = function (req, res) {
    if (req.params.id.length == 24) {
        Race.findById(req.params.id, function (err, response) {
            if (response != null) {

                res.send(response);
            }
            else {
                message = "Race " + req.params.id + " does not exist!";
                sendMessage(message, req,  res);
            }
        });
    }
    else {
        message = "Bad id!";
        sendMessage(message, req,  res);
    }
};

exports.race_detail_name = function (req, res) {
    Race.findOne({ 'name': req.params.name }, function (err, response) {
        if (response == null) {
            message = "Race " + req.params.name + " does not exist!";
            sendMessage(message, req,  res);
        }
        else {
            res.send(response);
        }
    });
};

exports.race_cafes = function (req, res) {
    if (req.params.id.length == 24) {
        Race.findById(req.params.id, function (err, response) {
            if (response != null) {
                var array = response.cafes;
                var cafesofRace = new Array;
                array.forEach(function (item) {

                    Cafe.findById(item, function (err, response2) {
                        console.log(response2);
                        cafesofRace.push(response2);
                        if (item == array[array.length - 1]) {
                            res.send(cafesofRace);
                        }
                    });
                })
            }
            else {
                message = "Race " + req.params.id + " does not exist!";
                sendMessage(message, req,  res);
            }
            
        });
    }
    else {
        message = "Bad id!";
        sendMessage(message, req,  res);
    }
};

exports.race_users = function (req, res) {
    if (req.params.id.length == 24) {
        Race.findById(req.params.id, function (err, response) {
            if (response != null) {
                console.log(response)
                console.log(response.users)
                var array = response.users;
                var usersofRace = new Array;
                array.forEach(function (item) {

                    User.findById(item, function (err, response2) {
                        console.log(response2);
                        usersofRace.push(response2);
                        if (item == array[array.length - 1]) {
                            res.send(usersofRace);
                        }
                    });
                })
            }
            else {
                message = "Race " + req.params.id + " does not exist!";
                sendMessage(message, req,  res);
            }
          
        });
    }
    else {
        message = "Bad id!";
            sendMessage(message, req,  res);
    }
   
};

exports.race_update_put = function (req, res) {
    var message = "";
    var error = false;
    var done = false;
    var done2 = false;
    var send = false;
    var updated = false;
    // use our bear model to find the bear we want
    Race.findById(req.params.id, function (err, race) {
        console.log(req.body);
        if (err) {

            if (send === false) {
                sendMessage(err, req,  res);
                send === true;
            }
        }
        else {
            if (req.body.name != null) {
                race.name = req.body.name;
            }
            if (req.body.starttime != null) {
                race.starttime = req.body.starttime;
            }
            if (req.body.endtime != null) {
                race.endtime = req.body.endtime;
            }
            race.cafes = new Array();
            if (req.body.cafes != null) {
                var array2 = new Array();
                if(typeof(req.body.cafes) === 'object'){
                    array2 = array2.concat(req.body.cafes);
                }
                else{
                    array2.push(req.body.cafes);
                }

                array2.forEach(function (item) {
                    console.log(item);
                    var id = item;
                    if (id.length == 24) {
                        Cafe.findById(id, function (err, caf) {
                            //console.log(caf);
                            if (caf == null) {
                                message = "Cafe " + item + " does not exist!";
                                error = true;
                                if (send === false) {
                                    sendMessage(message, req,  res);
                                    send === true;
                                }
                                return;
                            }
                        });

                        var found = false;
                        for (i = 0; i < race.cafes.length; i++) {
                            if (race.cafes[i] == item) {
                                found = true;
                            }
                        }
                        if (found == false) {
                            race.cafes.push(item);
                        }
                        else {
                            //race.cafes.remove(item);
                        }

                    }
                    else {
                        message = "Bad id";
                        error = true;
                        if (send === false) {
                            sendMessage(message, req,  res);
                            send === true;
                        }
                        return;
                    }
                    if (id == array2[array2.length - 1]) {
                        done = true;
                        console.log(done + " " + done2)
                        if (done2 === true) {
                            updateRace(race, res, req, error);
                            updated = true;
                        }
                    }
                });
            }
            else {
                done = true;
            }

            race.users = new Array();
            if (req.body.users != null) {
                var array = new Array();
                if(typeof(req.body.users) === 'object'){
                    array = array.concat(req.body.users);
                }
                else{
                    array.push(req.body.users);
                }
                array.forEach(function (item) {
                    var id = item;
                    console.log(id.length)
                    if (id.length == 24) {
                        User.findById(id, function (err, usr) {
                            if (usr == null) {
                                message = "User " + item + " does not exist!";
                                error = true;
                                if (send === false) {
                                    sendMessage(message, req,  res);
                                    send === true;
                                }
                                return;
                            }
                        });
                        var found = false;
                        for (i = 0; i < race.users.length; i++) {
                            if (race.users[i] == item) {
                                found = true;
                            }
                        }
                        if (found == false) {
                            race.users.push(item);
                        }
                        else {
                            //race.users.remove(item);
                        }
                    }
                    else {
                        message = "Bad id!";
                        error = true;
                        if (send === false) {
                            sendMessage(message, req,  res);
                            send === true;
                        }
                        return;
                    }
                    if (id == array[array.length - 1]) {
                        done2 = true;
                        console.log(done + " " + done2)
                        if (done === true) {
                            updateRace(race, res, req, error);
                            updated = true;
                        }
                    }
                });
            }
            else {
                done2 = true;
            }


            if (done === true && done2 === true && updated === false) {
                updateRace(race, res, req, error);
            }

            // update the bears info

            // save the bear
            
           
        }
      
        

    });

}

exports.race_delete = function (req, res) {
    Race.remove({
        _id: req.params.id
    }, function (err, race) {
        if (err) {
            res.send(err);
        }
        else {
            if (req.get('real-type') != null) {

                res.json({ message: 'Succesfully deleted!' });
            }
            else {
                ieks.index(req, res);
            }
        }
    });
};


exports.race_create_post = function (req, res) {
    var raceInfo = req.body; //Get the parsed information
    var send = false;
    var newRace = new Race();
    var done = false;
    var done2 = false;
    if (!raceInfo.name || !raceInfo.starttime || !raceInfo.endtime || !raceInfo.cafes) {
        res.send("Wrong info")
    } else {
        newRace.name = raceInfo.name;
        newRace.starttime = raceInfo.starttime;
        newRace.endtime = raceInfo.endtime;

        if (raceInfo.users != null) {
            var array2 = new Array();
            if(typeof(raceInfo.users) === 'object'){
                array2 = array2.concat(raceInfo.users);
            }
            else{
                array2.push(raceInfo.users);
            }
            array2.forEach(function (item) {
                if (item.length == 24) {
                    User.findById(item, function (err, usr) {
                        if (usr != null) {
                            newRace.users.push(usr);
                            console.log(usr._id + ", " + array2[array2.length - 1])
                            if (usr._id == array2[array2.length - 1]) {
                                done2 = true;
                            }
                        }
                        else {
                            if (send === false) {
                                message = "User " + item + " does not exist!";
                                sendMessage(message, req, res);
                                send = true
                                done2 = true;
                            }
                        }
                        })

                }
                else {
                    if (send === false) {

                        message = "Bad user id!";
                        sendMessage(message, req, res);
                        send = true;
                    }
                }
               
            });
        }
        else {
            done2 = true;
            console.log(done2)
        }


        var array = new Array();
        if(typeof(raceInfo.cafes) === 'object'){
            array = array.concat(raceInfo.cafes);
        }
        else{
            array.push(raceInfo.cafes);
        }
        array.forEach(function (item) {
            if (item.length == 24) {
                Cafe.findById(item, function (err, caf) {
                    if (caf != null) {
                        newRace.cafes.push(caf);
                        console.log(caf._id + ", " + array[array.length - 1])
                        if (caf._id == array[array.length - 1]) {
                            done = true;
                            if (done2 === true && send === false) {
                                console.log("hierrrr")
                                saveRace(newRace, res, req);
                            }
                        }
                    }
                    else {
                        if (send === false) {
                            message = "Cafe " + item + " does not exist!";
                            sendMessage(message, req,  res);
                            send = true
                            done = true;
                        }
                    }
                    
                   
                })
            }
            
            else {
                if (send === false) {

                    message = "Bad cafe id!";
                    sendMessage(message, req,  res);
                    send = true;
                }
            }
        })
        

        
        
        
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

function saveRace(race, res, req) {
    race.save(function (err, Race) {
        if (err) {
            res.send("database error" + err)
        } else {
            if (req.get('real-type') != null) {
                res.json({ message: 'New race added!' });
            }
            else {
                res.redirect('/races')
            }
        }
    });
}

function updateRace(race, res, req, error) {
    if (error === false) {
        race.save(function (err) {
            if (err) {
                res.send(err);
            }
            else {
                if (req.get('real-type') != null) {

                    res.json({ message: 'Race updated!' });
                }
                else {
                    res.redirect('/races');
                }
            }
        });
    }
}