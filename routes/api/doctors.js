const express = require('express');
const { check, validationResult } = require('express-validator');
const doctorModel = require('../../models/doctorModel')
const router = express.Router();
const auth = require('../../middleware/auth');
const checkAdmin = require('../../middleware/checkAdmin')
const bcrypt = require('bcryptjs');

// POST request to create a new resource: doctors

router.post('/', [auth, checkAdmin,
    [
        check('name').not().isEmpty(),
        check('password').not().isEmpty(),
        check('role').not().isEmpty(),
        check('email').not().isEmpty().isEmail()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, qualification, password, email, role } = req.body;
    try {
        let doctor = await doctorModel.findOne({ email });
        if (doctor) {
            return res
                .status(400)
                .json({ errors: [{ msg: "doctor already exists" }] });
        }
        doctor = new doctorModel({
            name, qualification, password, email, role
        });

        const salt = await bcrypt.genSalt(10);
        doctor.password = await bcrypt.hash(password, salt);

        await doctor.save();
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
    res.send("Resource created successfully")
})


module.exports = router;