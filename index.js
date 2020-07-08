const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyparser = require('body-parser');
const morgan = require('morgan');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');

connectDB();

app.use(morgan('dev'));
app.use(cors())
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/subjects', require('./routes/api/subjects'));
app.use('/api/modules', require('./routes/api/modules'));
app.use('/api/chapters', require('./routes/api/chapters'));
app.use('/api/tests', require('./routes/api/tests'));
app.use('/api/questions', require('./routes/api/questions'));
app.use('/api/colleges', require('./routes/api/colleges'));
app.use('/api/branches', require('./routes/api/branches'));
app.use('/api/answers', require('./routes/api/answers'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.use('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })

}

app.listen(PORT, () => {
    console.log(`API running in localhost:${PORT}`);
})