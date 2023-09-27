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
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
