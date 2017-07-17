var express = require('express');
var mongoose = require('mongoose');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//db connection
mongoose.connect('mongodb://127.0.0.1:27017');

//models
var Answer = require('./model/answer');
var Question = require('./model/question');
var Trivia = require('./model/trivia');

var port = process.env.PORT || 9090;

var router = express.Router();

//ROUTER
router.get('/', function (req, res) {
    //res.json({ message: 'supa' });

    var a1 = new Answer({
        title: "A1",
        correct: true
    });

    var a2 = new Answer({
        title: "А2",
        correct: true
    });

    a1.save();
    a2.save();

    var ids = [a1._id, a2._id];

    var q1 = new Question({
        name: "Q1",
        answers: ids
    });

    q1.save();

    var t1 = new Trivia({
        name: "T1",
        questions: [q1._id]
    });

    t1.save();

    res.json({ message: 'saved' });

});

router.route('/trivia')
    .get(function (request, response) {

        Trivia.find({}).populate({
            path: 'questions',
            populate: {
                path: 'answers',
                model: 'Answer',
                match: { _id: "596607d4eb16c91dd839f8c3"}
            }
        }).exec(function (err, result) {
            if (err)
                response.send(err);

            response.send(JSON.stringify(result, null, "\t"));
        });

    });

//register router
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);
