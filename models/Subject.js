const mongoose = require('mongoose');
const { Schema } = mongoose;

const SubjectSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subjectcode: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Subject = mongoose.model('subjects', SubjectSchema);