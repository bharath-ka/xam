const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
    // get token form header
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, require('../config/keys.js').jwtSecret);
        const user = await User.findOne({ _id: decoded.user.id });
        if (!user) return res.status(401).json({ msg: "Token invalid" })
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token invalid" });
    }
}