const mongoose = require("mongoose");

const TimeTableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["monday", ""],
    },
    classRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    period: {
      type: Number,
      required: true,
      enum: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TimeTable", TimeTableSchema);
