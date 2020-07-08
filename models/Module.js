const mongoose = require('mongoose');
const { Schema } = mongoose;

const ModuleSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subject_id: {
        type: Schema.Types.ObjectId,
        ref: 'subjects'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Module = mongoose.model('modules', ModuleSchema);