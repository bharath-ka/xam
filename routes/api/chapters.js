const router = require('express').Router();
const Chapter = require('../../models/Chapter');

router.post('/add', async (req, res) => {
    const {
        name,
        module_id
    } = req.body;

    try {
        let chapter = new Chapter({
            name,
            module_id
        });
        chapter = await chapter.save();
        res.status(200).json(chapter);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

router.post('/list', async (req, res) => {
    const { module_id } = req.body;
    try {
        const chapters = await Chapter.find({ module_id });
        res.status(200).json(chapters);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');

    }
});

module.exports = router;