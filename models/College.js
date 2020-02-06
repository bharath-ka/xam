const mongoose = require('mongoose');
const { Schema } = mongoose;

const CollegeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Class = mongoose.model('colleges', CollegeSchema);