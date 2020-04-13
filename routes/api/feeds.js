const express = require("express");
const router = express.Router();
const Pusher = require("pusher");
const feedModel = require("../../models/feedModel");
const config = require("config");
const auth = require("../../middleware/auth");
const appId = config.get("appId");
const key = config.get("key");
const secret = config.get("secret");
const cluster = config.get("cluster");
const encrypted = config.get("encrypted");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");

const pusher = new Pusher({
  appId: appId,
  key: key,
  secret: secret,
  cluster: cluster,
  useTLS: encrypted,
});

function checkLocationSchema(req, res, next) {
  const { type, coordinates } = req.body.location;
  if (_.isEmpty(type) || _.isEmpty(coordinates)) {
    return res.status(400).send("please enter location data");
  }
  next();
}

router.get("/", async (req, res) => {
  const feeds = await feedModel.find();
  res.send(feeds);
});

router.post(
  "/",
  [
    auth,
    [
      check("name").not().isEmpty(),
      check("phone").not().isEmpty(),
      check("message").not().isEmpty(),
      check("address").not().isEmpty(),
    ],
    checkLocationSchema,
  ],
  async (req, res) => {
    const { name, address, phone, message, location, id } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const feed = new feedModel({
        name,
        id,
        address,
        phone,
        message,
        location,
      });

      await feed.save().then((feed) =>
        pusher.trigger("covid-feed", "feed", {
          _id: feed._id,
          name: feed.name,
          address: feed.address,
          phone: feed.phone,
          message: feed.message,
          location: feed.location,
          id: feed.id,
        })
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
    return res.send("message sent successfully");
  }
);

module.exports = router;
