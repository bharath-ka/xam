const mongoose = require('mongoose');
const { Schema } = mongoose;

const BaseTestSchema = new Schema({

    question_ids: [
        {
            type: Schema.Types.ObjectId,
            ref: 'questions'
        }
    ],
    priority: {
        type: String,
        default: 'normal'
    },
    createdon: {
        type: Date,
        default: Date.now()
    }
});

module.exports = BaseTest = mongoose.model('basetests', BaseTestSchema);