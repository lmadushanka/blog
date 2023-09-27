const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    classNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    grade: {
      type: Number,
      required: true,
    },
    section: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", ClassSchema);
