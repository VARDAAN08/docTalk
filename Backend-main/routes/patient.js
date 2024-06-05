const express = require("express");
const { reportUpload,getAllReports,getPatientById } = require("../controllers/patient");
const { authPass } = require("../controllers/auth");
const router = express.Router();
const upload = require("../middlewares/multer");

router.post("/uploadReport", upload.array("files", 5),authPass, reportUpload);
router.get("/getAllReports",authPass, getAllReports);
// router.get("/getPatientById/:id",authPass, getPatientById);

module.exports = router;