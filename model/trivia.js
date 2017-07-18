var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TriviaSchema = new Schema({
    name: String,
    userId: Number,
    questions: [{
        type: Schema.Types.ObjectId, ref: 'Question'
    }]
});

module.exports = mongoose.model('Trivia', TriviaSchema);