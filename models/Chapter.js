const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChapterSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    module_id: {
        type: Schema.Types.ObjectId,
        ref: 'modules'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = Chapter = mongoose.model('chapters', ChapterSchema);