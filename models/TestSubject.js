const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestSubjectSchema = new Schema({
    subject: {
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    },
    test_id: {
        type: Schema.Types.ObjectId,
        ref: 'tests'
    },
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'branches'
    },
    section_id: {
        type: Schema.Types.ObjectId,
        ref: 'sections'
    },
    module_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'modules'
        }
    ],
    base_id: {
        type: Schema.Types.ObjectId,
        ref: 'basetests'
    },
    totalrounds: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = TestSubject = mongoose.model('testsubjects', TestSubjectSchema);