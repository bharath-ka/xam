const router = require('express').Router();
const Class = require('../../models/Class');

router.post('/add', async (req, res) => {
    const {
        name,
        section,
        college_id
    } = req.body;

    try {
        let class_ = new Class({
            name,
            section,
            college_id
        });
        class_ = await class_.save();
        res.status(200).json(class_);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

router.get('/list', async (req, res) => {
    try {
        const classes = await Class.find();
        res.status(200).json(classes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;