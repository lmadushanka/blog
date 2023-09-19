const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    profilePhoto: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png",
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["admin", "student", "parent", "teacher", "backOffice"],
    },
    student: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      ],
    },
    parent: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Parent",
        },
      ],
    },
    teacher: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "teacher",
        },
      ],
    },
    backOffice: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "BackOffice",
        },
      ],
    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

//Hash password
UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 8);
  next();
});

//Match password
UserSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Generate token
UserSchema.methods.isGenerateToken = async function (userId) {
  return jwt.sign({ userId }, process.env.JWT_KEY, { expiresIn: "1d" });
};

module.exports = mongoose.model("User", UserSchema);
