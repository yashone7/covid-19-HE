const mongoose = require("mongoose");

let doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["doctor", "public", "ngo"],
    default: "doctor",
    required: true,
  },
});

const doctorModel = mongoose.model("doctorModel", doctorSchema);
module.exports = doctorModel;
