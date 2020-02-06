const mongoose = require('mongoose');
const { Schema } = mongoose;

const QuestionSchema = new Schema({
    chapter_id: {
        type: Schema.Types.ObjectId,
        ref: 'chapters'
    },
    question: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Question = mongoose.model('questions', QuestionSchema);