// var async = require('async');
// var mongoose = require('mongoose');
// var User = mongoose.model('User');
// var Author = mongoose.model('Author');
// var Book = mongoose.model('Book');
//
// function fillAuthors(done){
//     Author.remove({}, function(){
//         async.parallel([
//             function(cb) { new Author({ _id: 'first', firstName: 'Martijn', lastName: 'Schuurmans', birthDate: new Date('1988-04-27'), country: 'NL', ranking: 10, books: ['book1', 'book3']}).save(cb); },
//             function(cb) { new Author({ _id: 'second', firstName: 'Piet', middleName: 'van', lastName: 'Pietersen', birthDate: new Date('1988-04-27'), country: 'EN', ranking: 8, books: []}).save(cb); },
//             function(cb) { new Author({ _id: 'third', firstName: 'Henk', lastName: 'Henksen', birthDate: new Date('1988-04-27'), country: 'BE', ranking: 12, books: []}).save(cb); },
//             function(cb) { new Author({ _id: 'fourth', firstName: 'Jan', lastName: 'Jansen', birthDate: new Date('1988-04-27'), country: 'DE', ranking: 5, books: []}).save(cb); },
//             function(cb) { new Author({ _id: 'fifth', firstName: 'Karel', lastName: 'Karelsen', birthDate: new Date('1988-04-27'), country: 'NL', ranking: 20, books: []}).save(cb); }
//         ], function() {
//             done();
//         })
//     });
// };
//
// function fillBooks(done){
//     Book.remove({}, function(){
//         async.parallel([
//             function(cb) { new Book({ _id: 'book1', title: 'book1', publishDate: new Date('1988-04-27'), category: 'Fantasy', ranking: 20, chapters: []}).save(cb); },
//             function(cb) { new Book({ _id: 'book2', title: 'book2', publishDate: new Date('1988-04-27'), category: 'Crime', ranking: 20, chapters: []}).save(cb); },
//             function(cb) { new Book({ _id: 'book3', title: 'book3', publishDate: new Date('1988-04-27'), category: 'Drama', ranking: 20, chapters: []}).save(cb); }
//         ], function() {
//             done();
//         });
//     });
// };
//
// module.exports = {
//     fillTestdata: function(done){
//         async.parallel([
//             fillAuthors,
//             fillBooks
//         ], function(){ done() });
//     }
// }