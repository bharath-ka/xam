const mongoose = require('mongoose');
const { Schema } = mongoose;

const BranchSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    short_name: {
        type: String,
        required: true
    },
    college_id: {
        type: Schema.Types.ObjectId,
        ref: 'colleges'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Class = mongoose.model('branches', BranchSchema);