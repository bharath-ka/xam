const mongoose = require('mongoose');
const { Schema } = mongoose;

const SectionSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Class = mongoose.model('sections', SectionSchema);