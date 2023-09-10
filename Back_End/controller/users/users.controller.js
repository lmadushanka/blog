const User = require("../../model/user/user.model");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../../errors/index");

//--------------------------------------------------
//Register
//--------------------------------------------------
const userRegisterController = async (req, res) => {
  const userDetails = {
    firstName: req?.body?.firstName,
    lastName: req?.body.lastName,
    email: req?.body?.email,
    password: req?.body?.password,
  };

  const user = await User.create(userDetails);

  return res.status(StatusCodes.CREATED).json({
    user,
  });
};

//--------------------------------------------------
//Get All Users
//--------------------------------------------------
const getAllUsers = async (req, res) => {
  const user = await User.find({});

  return res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  userRegisterController,
  getAllUsers,
};
