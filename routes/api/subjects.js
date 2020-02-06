const router = require('express').Router();
const Subject = require('../../models/Subject');
const auth = require('../../middleware/auth')

router.post('/add', auth, async (req, res) => {
    const {
        name,
        subjectcode,
    } = req.body;

    try {
        const subjects = new Subject({
            name,
            subjectcode
        });
        const sub = await subjects.save();
        res.send(sub);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

router.get('/list', auth, async (req, res) => {

    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;