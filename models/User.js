const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    branch_id: {
        type: Schema.Types.ObjectId,
        ref: 'branches'
    },
    section_id: {
        type: Schema.Types.ObjectId,
        ref: 'sections'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = User = mongoose.model('users', UserSchema);