// middleware used for accessing protected routes
const _ = require("lodash");

module.exports = function (req, res, next) {
    const role = req.user.user;
    if (!_.isMatch(role, { role: "doctor" })) {
        return res.status(403).json({ msg: "access denied" });
    }
    next();
};
