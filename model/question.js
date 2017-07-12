var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
    name: String,
    answers: [{
        type: Schema.Types.ObjectId, ref: 'Answer'
    }]
});

module.exports = mongoose.model('Question', QuestionSchema);