const router = require('express').Router();
const Module = require('../../models/Module');

router.post('/add', async (req, res) => {
    const {
        name,
        subject_id
    } = req.body;
    try {
        let module = new Module({
            name,
            subject_id
        });
        module = await module.save();
        res.status(200).json(module);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

router.post('/list', async (req, res) => {
    const { subject_id } = req.body;
    try {
        const modules = await Module.find({ subject_id });
        res.status(200).json(modules);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;  