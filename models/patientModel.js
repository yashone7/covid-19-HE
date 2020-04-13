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
  },
  email: {
    type: String,
  },
  address: {
    type: String,
  },
  location: {
    type: pointSchema,
    required: true,
  },
});

let occupationSchema = new mongoose.Schema({
  occupation: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "daily wage worker",
      "working class",
      "middle class",
      "student",
      "other",
    ],
    required: true,
  },
});

let medicalHistorySchema = new mongoose.Schema({
  isDiabetic: {
    type: Boolean,
    required: true,
  },
  isAsthmatic: {
    type: Boolean,
    required: true,
  },
  hasHighBloodPressure: {
    type: Boolean,
    required: true,
  },
  isHighRisk: {
    type: Boolean,
    required: true,
  },
  remarks: {
    type: String,
  },
});

let patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
  },
  uniqueID: {
    type: String,
    required: true,
  },
  contact: {
    type: contactSchema,
    required: true,
  },
  occupationDetails: {
    type: occupationSchema,
    required: true,
  },
  medicalHistory: {
    type: medicalHistorySchema,
    required: true,
  },
});

const patientModel = mongoose.model("patientModel", patientSchema);
module.exports = patientModel;
