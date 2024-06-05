const express = require("express");
const {
  getAllDoctors,
  getAppointments,
  getReferedAppointments,
  referDoctor,
  uploadPrescription,
  getDoctorById,
} = require("../controllers/doctor");
const { authPass } = require("../controllers/auth");
const router = express.Router();
const upload = require("../middlewares/multer");
const Report = require("../models/report");

router.get("/getAllDoctors", getAllDoctors);
router.get("/getAppointments", authPass, getAppointments);
router.get("/getReferedAppointments", authPass, getReferedAppointments);
router.post("/referDoctor", authPass, referDoctor);
router.post(
  "/uploadPrescription",
  upload.array("files", 5),
  authPass,
  uploadPrescription
);
// router.get("/getDoctorById/:id", authPass, getDoctorById);

router.post("/getLink", async (req, res) => {
  const { link, yourName } = req.body;
  try {
    const id = yourName
    console.log(id)
    const report = await Report.findById( id);
    if (!report) {
      console.log("No doctor")
      return res.status(404).send("NO Doctor Found");
    }
    report.meetLink = link;
    report.save();
    console.log(report)
    res.status(200).json({
      msg: "Success",
      data: link,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).send(error);
  }
});

module.exports = router;
