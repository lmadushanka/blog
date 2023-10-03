const User = require("../../model/user/user.model");
const { StatusCodes } = require("http-status-codes");
const validateMongodbId = require("../../utils/validateMongodbID");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");

//!--------------------------------------------------
//! Register
//!--------------------------------------------------
const userRegisterController = async (req, res) => {
  const { userName, password, role, student, parent, teacher, backOffice } =
    req.body;

  if (
    !userName ||
    !password ||
    !role ||
    (!student && !parent && !teacher && !backOffice)
  ) {
    throw new BadRequestError(`Please provide all required user details`);
  }

  const user = await User.create({
    userName,
    password,
    role,
    student,
    parent,
    teacher,
    backOffice,
  });

  return res.status(StatusCodes.CREATED).json({
    user,
  });
};

//!--------------------------------------------------
//! Login user
//!--------------------------------------------------
const loginUserController = async (req, res) => {
  const { userName, password } = req?.body;

  //Check if empty request body
  if (!userName || !password) {
    throw new BadRequestError(`Please provide all credentials`);
  }

  console.log("test");

  //Check if user exist
  const userFound = await User.findOne({ userName: userName });

  if (!userFound) {
    throw new NotFoundError(
      `Login failed!, cannot find any user this userName: ${userName}`
    );
  }

  //Check if password is match
  if (!(await userFound.isPasswordMatched(password))) {
    throw new UnAuthenticatedError(`Invalid password`);
  }

  const userRole = userFound.role;

  return res.status(StatusCodes.OK).json({
    _id: userFound._id,
    isAdmin: userFound.isAdmin,
    token: await userFound.isGenerateToken(userFound._id),
  });
};

//!--------------------------------------------------
//! Get All Users
//!--------------------------------------------------
const getAllUsersController = async (req, res) => {
  const user = await User.find({});

  return res.status(StatusCodes.OK).json({ user });
};

//!--------------------------------------------------
//! Delete user
//!--------------------------------------------------
const deleteUserController = async (req, res) => {
  const { id } = req.params;

  //Check if user id is valid
  validateMongodbId(id);

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser)
    throw new NotFoundError(`Cannot find the user by _id: ${id}`);

  res.status(StatusCodes.OK).json(deletedUser);
};

//!--------------------------------------------------
//! Get user details
//!--------------------------------------------------
const getUserDetailsController = async (req, res) => {
  const { id } = req.params;

  //Check if user id valid
  validateMongodbId(id);

  const userDetails = await User.findById(id)
    .populate("student")
    .populate("parent")
    .populate("teacher")
    .populate("backOffice");

  if (!userDetails)
    throw new NotFoundError(`Cannot find the user by _id: ${id}`);

  res.status(StatusCodes.OK).json(userDetails);
};

//!--------------------------------------------------
//! User profile
//!--------------------------------------------------
const userProfileController = async (req, res) => {
  const { id } = req.params;

  //Check if user id valid
  validateMongodbId(id);

  const profile = await User.findById(id)
    .populate("student")
    .populate("parent")
    .populate("teacher")
    .populate("backOffice");

  if (!profile)
    throw new NotFoundError(`Cannot find the user profile by _id: ${id}`);

  res.status(StatusCodes.OK).json(profile);
};

//!--------------------------------------------------
//! Update user profile
//!--------------------------------------------------
const updateUserProfileController = async (req, res) => {
  const { id } = req.params;

  //Check if user id valid
  validateMongodbId(id);

  const userDetails = {
    firstName: req?.body?.firstName,
    lastName: req?.body.lastName,
    email: req?.body?.email,
  };

  const updatedProfile = await User.findByIdAndUpdate(id, userDetails, {
    new: true,
    runValidators: true,
  });

  if (!updatedProfile)
    throw new NotFoundError(`Cannot find the user profile by _id: ${id}`);

  res.status(StatusCodes.OK).json(updatedProfile);
};

//!--------------------------------------------------
//! Update password
//!--------------------------------------------------
const updatePasswordController = async (req, res) => {
  const { id } = req.params;

  const { password } = req.body;

  //Check if user id valid
  validateMongodbId(id);

  const user = await User.findById(id);

  if (!user)
    throw new NotFoundError(`Cannot find the user profile by _id: ${id}`);

  if (password) {
    user.password = password;

    const updatedUser = await user.save();

    res.status(StatusCodes.OK).json(updatedUser);
  }

  res.status(StatusCodes.OK).json(user);
};

module.exports = {
  userRegisterController,
  loginUserController,
  getAllUsersController,
  deleteUserController,
  getUserDetailsController,
  userProfileController,
  updateUserProfileController,
  updatePasswordController,
};
