const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    registerNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    shortName: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    nic: {
      type: Number,
      required: true,
      unique: true,
    },
    mobileNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    landPhoneNumber: {
      type: Number,
    },
    alternativeNumber: {
      type: Number,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    presentAddress: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: String,
      required: true,
    },
    lastAppointment: {
      type: String,
      required: true,
    },
    timetable: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Timetable",
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", TeacherSchema);
