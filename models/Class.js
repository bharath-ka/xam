const mongoose = require('mongoose');
const { Schema } = mongoose;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    college: {
        type: Schema.Types.ObjectId,
        ref: 'colleges'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Class = mongoose.model('classes', ClassSchema);