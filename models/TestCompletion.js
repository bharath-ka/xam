const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestCompletionSchema = new Schema({

    base_id: {
        type: Schema.Types.ObjectId,
        ref: 'basetests',
        default: null,
    },
    test_id: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    question_id: {
        type: Schema.Types.ObjectId,
        ref: 'questions',
        default: null,
    },
    questionround: {
        type: String
    },
    submitted: {
        type: Boolean,
        default: false
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    rank: {
        type: String,
        default: null
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = TestCompletion = mongoose.model('testcompletions', TestCompletionSchema);