const mongoose = require("mongoose");

const ParentSchema = new mongoose.Schema(
  {
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    children: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
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
    presentAddress: {
      type: String,
      required: true,
    },
    permanentAddress: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
      enum: ["father", "mother", "grand father", "grand mother", "other"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parent", ParentSchema);
