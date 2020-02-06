const User = require('../../models/User');
const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');
router.post('/add', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a passsword with 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role is required').not().isEmpty(),
    check('branch_id', 'BranchID is required').not().isEmpty(),
    check('section_id', 'SectionID is required').not().isEmpty(),
],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            return res.status(400).json({
                errors: err.array()
            });
        }
        const {
            name,
            email,
            password,
            role,
            branch_id,
            section_id
        } = req.body;
        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User Already exists' }] });
            }
            user = new User({
                name,
                email,
                password,
                role,
                branch_id,
                section_id
            });
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);
            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                require('../../config/keys').jwtSecret,
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');

        }
    });

module.exports = router;