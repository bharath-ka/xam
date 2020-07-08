const mongoose = require('mongoose');
const keys = require('./keys');

const connectDB = async () => {
    try {
        await mongoose.connect(keys.mongoURI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('MongoDB connected');

    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;