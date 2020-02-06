const router = require('express').Router();
const Branch = require('../../models/Branch');
const Section = require('../../models/Section');


router.post('/add', async (req, res) => {
    const {
        name,
        short_name,
        college_id
    } = req.body;

    try {
        let branch = new Branch({
            name,
            short_name,
            college_id
        });
        branch = await branch.save();
        res.status(200).json(branch);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



router.post('/list', async (req, res) => {
    const { college_id } = req.body;
    try {
        const colleges = await Branch.find({ college_id });
        res.status(200).json(colleges);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

router.post('/sections/add', async (req, res) => {
    const {
        name
    } = req.body;

    try {
        let section = new Section({
            name
        });
        section = await section.save();
        res.status(200).json(section);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});



router.get('/sections/list', async (req, res) => {
    try {
        const section = await Section.find({});
        res.status(200).json(section);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;