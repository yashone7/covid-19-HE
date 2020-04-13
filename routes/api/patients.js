const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const patientModel = require("../../models/patientModel");
const checkAdmin = require("../../middleware/checkAdmin");
const _ = require("lodash");

function checkLocationSchema(req, res, next) {
  const { type, coordinates } = req.body.contact.location;
  if (_.isEmpty(type) || _.isEmpty(coordinates)) {
    return res.status(400).send("please enter location data");
  }
  next();
}

function checkOccupationSchema(req, res, next) {
  const { occupation, category } = req.body.occupationDetails;
  if (_.isEmpty(occupation) || _.isEmpty(category)) {
    return res.status(400).send("Please enter occupation data");
  }
  next();
}

function checkMedicalHistory(req, res, next) {
  const { medicalHistory } = req.body;
  if (_.isEmpty(medicalHistory)) {
    return res.status(400).send("Please enter medical history");
  }
  next();
}

// POST request - creating a patient
router.post(
  "/",
  [
    auth,
    checkAdmin,
    [
      check("name").not().isEmpty(),
      check("age").not().isEmpty(),
      check("uniqueID").not().isEmpty(),
    ],
    checkLocationSchema,
    checkOccupationSchema,
    checkMedicalHistory,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      age,
      uniqueID,
      gender,
      contact,
      occupationDetails,
      medicalHistory,
    } = req.body;
    try {
      let patient = await patientModel.findOne({ uniqueID });
      if (patient) {
        return res
          .status(400)
          .json({ errors: [{ msg: "patient already exists" }] });
      }
      patient = new patientModel({
        name,
        age,
        uniqueID,
        gender,
        contact,
        medicalHistory,
        occupationDetails,
      });

      await patient.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
    res.send("resource created successfully");
  }
);

// Updating the patient
router.patch("/:id", [auth, checkAdmin], async (req, res) => {
  const update = {};
  _.assign(update, req.body);
  patientModel
    .updateOne({ uniqueID: req.params.id }, { $set: update })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.error(err.message));
});

// deleting the patient
router.delete("/:id", [auth, checkAdmin], async (req, res) => {
  patientModel
    .findOneAndDelete({ _id: req.params.id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.error(err.message));
});

// getting patient by id
router.get("/:id", [auth, checkAdmin], async (req, res) => {
  const patient = await patientModel.findById(req.params.id);
  if (!patient) {
    return res.status(404).send("The patient with the given id does not exist");
  }
  res.status(200).send(patient);
});

// getting all patients
router.get("/", [auth, checkAdmin], async (req, res) => {
  try {
    const patients = await patientModel.find().select("-__v");
    res.send(patients);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
