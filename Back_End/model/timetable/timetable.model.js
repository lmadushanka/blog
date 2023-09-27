const mongoose = require("mongoose");

const TimetableSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: ["monday", "tuesday", "wednesday", "thursday", "friday"],
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
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Timetable", TimetableSchema);
