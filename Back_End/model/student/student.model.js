const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
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
    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parent",
    },
    subjects: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    dob: {
      type: String,
      required: true,
    },
    enrolmentDate: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
