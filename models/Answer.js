const mongoose = require('mongoose');
const { Schema } = mongoose;

const AnswerSchema = new Schema({
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'questions'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    answer: {
        type: String
    },
    test_id: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    questionRound: {
        type: Number,
        required: true
    },
    evaluation: {
        type: Boolean,
        default: false
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Answer = mongoose.model('answers', AnswerSchema);