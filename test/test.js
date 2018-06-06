process.env.NODE_ENV = 'test';

var app = require('../index');
var User = require('../models/user');
var Cafe = require('../models/cafe');
var Race = require('../models/race');
var request = require('supertest');
//var passportStub = require('passport-stub');
var testdata = require('./testdata');
var expect = require('chai').expect;

//passportStub.install(app);

describe('Cafe', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var cafe = new Cafe();
            cafe.name = "Luna's café";
            cafe.save(done);
        });
    });


});

describe('Race', function() {
    describe('#save()', function() {
        it('should save without error', function(done) {
            var race = new Race();
            race.name = "Luna's Race";
            race.starttime = "12:00";
            race.endtime = "17:00";
            race.save(done);
        });
    });

});

// describe('Race', function() {
//     describe('#save()', function() {
//         it('should not save with bad time format', function(done) {
//             var race = new Race();
//             race.name = "Luna's Race";
//             race.starttime = "12:00";
//             race.endtime = "25:00";
//             request(app)
//                 .post('/races/create')
//                 .send(race)
//                 .end(function(err, res){
//                     if(err) done(err);
//                 })
//         });
//     });
//
// });
