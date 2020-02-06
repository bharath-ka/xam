const mongoose = require('mongoose');
const { Schema } = mongoose;

const TestSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    college_id: {
        type: Schema.Types.ObjectId,
        ref: 'colleges'
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

module.exports = Test = mongoose.model('tests', TestSchema);