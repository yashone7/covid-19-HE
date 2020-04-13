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

let testSchema = new mongoose.Schema({
  test_date: {
    type: Date,
    required: true,
  },
  location: {
    type: pointSchema,
    required: true,
  },
  patient_id: {
    type: String,
    ref: "patientModel",
    required: true,
  },
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctorModel",
    required: true,
  },
  status: {
    type: String,
    enum: ["positive", "negative", "pending"],
    default: "pending",
    required: true,
  },
});

const testModel = new mongoose.model("testModel", testSchema);
module.exports = testModel;
