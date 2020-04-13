const express = require("express");
const { check, validationResult } = require("express-validator");
const userModel = require("../../models/userModel");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkAdmin = require("../../middleware/checkAdmin");
const bcrypt = require("bcryptjs");
const _ = require("lodash");

function checkContactSchema(req, res, next) {
  const { phone, address } = req.body.contact;
  if (_.isEmpty(phone) || _.isEmpty(address)) {
    return res.status(400).send("please enter contact info");
  }
  next();
}

// function checkLocationSchema(req, res, next) {
//   const { type, coordinates } = req.body.contact.location;
//   if (_.isEmpty(type) || _.isEmpty(coordinates)) {
//     return res.status(400).send("please enter location data");
//   }
//   next();
// }

// route to create a new user
router.post(
  "/",
  [
    [
      check("name").not().isEmpty(),
      check("email").isEmail().not().isEmpty(),
      check("password").not().isEmpty(),
      check("role").not().isEmpty(),
    ],
    checkContactSchema,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name, role, contact } = req.body;
    try {
      let user = await userModel.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "user already exists" }] });
      }
      user = new userModel({
        name,
        contact,
        password,
        email,
        role,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
    res.send("resource created successfully");
  }
);

// route to edit a user -
router.patch("/:id", [auth, checkAdmin], async (req, res) => {
  const update = {};
  _.assign(update, req.body);
  userModel
    .updateOne({ uniqueID: req.params.id }, { $set: update })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.error(err.message));
});

module.exports = router;
