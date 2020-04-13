const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const checkAdmin = require("../../middleware/checkAdmin");
const { check, validationResult } = require("express-validator");
const _ = require("lodash");
const testModel = require("../../models/testModel");
const { parseISO } = require("date-fns");

// function to check schema of location -- req.body validator
function checkLocationSchema(req, res, next) {
  const { type, coordinates } = req.body.location;
  if (_.isEmpty(type) || _.isEmpty(coordinates)) {
    return res.status(400).send("please enter location data");
  }
  next();
}

// POST request to /api/tests to create a new test
router.post(
  "/",
  [
    auth,
    checkAdmin,
    [
      check("status").not().isEmpty(),
      check("test_date").not().isEmpty(),
      check("patient_id").not().isEmpty(),
      check("doctor_id").isMongoId().not().isEmpty(),
    ],
    checkLocationSchema,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { status, test_date, patient_id, doctor_id, location } = req.body;
    try {
      const test = new testModel({
        status,
        test_date,
        patient_id,
        location,
        doctor_id,
      });
      await test.save();
    } catch (err) {
      console.error(err.message);
      res.status(500).send("server error");
    }
    res.send("test recorded successfully");
  }
);

// PATCH request to /api/tests to update a test result
router.patch("/:id", [auth, checkAdmin], async (req, res) => {
  const update = {};
  _.assign(update, req.body);
  testModel
    .updateOne({ patient_id: req.params.id }, { $set: update })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => console.error(err.message));
});

// route to find test results /api/get
router.get(
  "/",
  /*[auth],*/ async (req, res) => {
    const { orderBy, startDate, endDate, groupBy, matchBy } = req.query;

    if (orderBy === "none") {
      try {
        const tests = await testModel.aggregate([
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (orderBy === "date" && groupBy === "highRisk") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              test_date: { $gt: parseISO(startDate), $lt: parseISO(endDate) },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$patient.medicalHistory.isAsthmatic", true] },
                  { $eq: ["$patient.medicalHistory.isDiabetic", true] },
                  { $eq: ["$patient.medicalHistory.isHighRisk", true] },
                  {
                    $eq: ["$patient.medicalHistory.hasHighBloodPressure", true],
                  },
                ],
              },
            },
          },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (orderBy === "date") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              test_date: { $gt: parseISO(startDate), $lt: parseISO(endDate) },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "negative" && orderBy === "date") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              test_date: { $gt: parseISO(startDate), $lt: parseISO(endDate) },
              status: { $eq: "negative" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "positive" && orderBy === "date") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              test_date: { $gt: parseISO(startDate), $lt: parseISO(endDate) },
              status: { $eq: "positive" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "negative" && groupBy === "none") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              status: { $eq: "negative" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "positive" && groupBy === "none") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              status: { $eq: "positive" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "positive" && groupBy === "highRisk") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              status: { $eq: "positive" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$patient.medicalHistory.isAsthmatic", true] },
                  { $eq: ["$patient.medicalHistory.isDiabetic", true] },
                  { $eq: ["$patient.medicalHistory.isHighRisk", true] },
                  {
                    $eq: ["$patient.medicalHistory.hasHighBloodPressure", true],
                  },
                ],
              },
            },
          },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "positive" && groupBy === "notHighRisk") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              status: { $eq: "positive" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$patient.medicalHistory.isAsthmatic", false] },
                  { $eq: ["$patient.medicalHistory.isDiabetic", false] },
                  { $eq: ["$patient.medicalHistory.isHighRisk", false] },
                  {
                    $eq: [
                      "$patient.medicalHistory.hasHighBloodPressure",
                      false,
                    ],
                  },
                ],
              },
            },
          },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "negative" && groupBy === "healthy") {
      try {
        const tests = await testModel.aggregate([
          {
            $match: {
              status: { $eq: "negative" },
            },
          },
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ["$patient.medicalHistory.isAsthmatic", false] },
                  { $eq: ["$patient.medicalHistory.isDiabetic", false] },
                  { $eq: ["$patient.medicalHistory.isHighRisk", false] },
                  {
                    $eq: [
                      "$patient.medicalHistory.hasHighBloodPressure",
                      false,
                    ],
                  },
                ],
              },
            },
          },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    }

    if (matchBy === "negative" && groupBy === "highRisk") {
      try {
        const tests = await testModel.aggregate([
          {
            $lookup: {
              from: "patientmodels",
              localField: "patient_id",
              foreignField: "uniqueID",
              as: "patient",
            },
          },
          { $unwind: "$patient" },
          {
            $match: {
              $expr: {
                $or: [
                  { $eq: ["$patient.medicalHistory.isAsthmatic", true] },
                  { $eq: ["$patient.medicalHistory.isDiabetic", true] },
                  { $eq: ["$patient.medicalHistory.isHighRisk", true] },
                  {
                    $eq: ["$patient.medicalHistory.hasHighBloodPressure", true],
                  },
                ],
              },
            },
          },
        ]);
        return res.send(tests);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
      }
    } else return res.status(405).send("Invalid request");
  }
);

module.exports = router;
