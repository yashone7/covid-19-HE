const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const auth = require("../../middleware/auth");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Invalid  Credentials" }] });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

router.get("/", [auth], async (req, res) => {
  try {
    // console.log(req.user);
    const user = await userModel
      .findById(req.user.user.id)
      .select("-password -__v");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
