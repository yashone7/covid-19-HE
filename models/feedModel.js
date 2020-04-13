const mongoose = require("mongoose");

let pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Point"],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

let feedSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
});

const feedModel = mongoose.model("feedModel", feedSchema);
module.exports = feedModel;
