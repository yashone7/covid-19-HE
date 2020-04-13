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

let contactSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
  },
  location: {
    type: pointSchema,
  },
});

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "public", "ngo"],
    default: "ngo",
    required: true,
  },
  contact: {
    type: contactSchema,
    required: true,
  },
});

const userModel = mongoose.model("userModel", userSchema);
module.exports = userModel;
