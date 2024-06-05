const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
    DoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    meetLink: String,
    date: String,
    time: String,
    reasonForVisit: String,
    medicalFiles: {
      type: Array,
      default: [],
    },
    referedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      default: null
    },
    prescription: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
