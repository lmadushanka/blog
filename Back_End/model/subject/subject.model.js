const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  subjectNumber: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  sinhala: {
    type: Boolean,
    default: false,
  },
  english: {
    type: Boolean,
    default: false,
  },
  classes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
  ],
  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
