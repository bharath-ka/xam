const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerKeySchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
    },
    answerKey: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = AnswerKey = mongoose.model('answerkeys', AnswerKeySchema);