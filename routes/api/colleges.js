const router = require('express').Router();
const College = require('../../models/College');

router.post('/add', async (req, res) => {
    const {
        name,
        short_name
    } = req.body;

    try {
        let college = new College({
            name,
            short_name
        });
        college = await college.save();
        res.status(200).json(college);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



router.get('/list', async (req, res) => {
    try {
        const colleges = await College.find({});
        res.status(200).json(colleges);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;