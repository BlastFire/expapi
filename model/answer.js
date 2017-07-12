var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnswerSchema = new Schema({
    title: String,
    correct: Boolean
});

module.exports = mongoose.model('Answer', AnswerSchema);

