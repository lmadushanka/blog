const Parent = require("../../model/parent/parent.model");
const Class = require("../../model/class/class.model");
const { StatusCodes } = require("http-status-codes");
const validateMongodbId = require("../../utils/validateMongodbID");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");

//--------------------------------------------------
//Register parent
//--------------------------------------------------
const registerParent = async (req, res) => {
  const {
    nic,
    name,
    children,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    presentAddress,
    permanentAddress,
    relationship,
  } = req.body;

  if (
    !nic ||
    !name ||
    !mobileNumber ||
    !presentAddress ||
    !permanentAddress ||
    !relationship
  ) {
    throw new BadRequestError(`Please provide all require records`);
  }

  const parent = await Parent.create({
    nic,
    name,
    children,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    presentAddress,
    permanentAddress,
    relationship,
  });

  return res.status(StatusCodes.CREATED).json(parent);
};

//--------------------------------------------------
//Fetch all parent
//--------------------------------------------------
const fetchAllParent = async (req, res) => {
  const parents = await Parent.find({});

  return res.status(StatusCodes.OK).json(parents);
};

//--------------------------------------------------
//Fetch parent details
//--------------------------------------------------
const fetchParentDetail = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const parent = await Parent.findById(id).populate("children");

  if (!parent) throw new NotFoundError(`Cannot find any parent ny id: ${id}`);

  return res.status(StatusCodes.OK).json(parent);
};

//--------------------------------------------------
//Update parent
//--------------------------------------------------
const updateParent = async (req, res) => {
  const {
    nic,
    name,
    children,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    presentAddress,
    permanentAddress,
    relationship,
  } = req.body;

  const { id } = req.params;

  validateMongodbId(id);

  if (
    !nic ||
    !name ||
    !mobileNumber ||
    !presentAddress ||
    !permanentAddress ||
    !relationship
  ) {
    throw new BadRequestError(`Please provide all require records`);
  }

  const parent = await Parent.findById(id);

  if (!parent) throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  const updatedParent = await Parent.findByIdAndUpdate(id, {
    nic,
    name,
    children,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    presentAddress,
    permanentAddress,
    relationship,
  });

  return res.status(StatusCodes.CREATED).json(updatedParent);
};

//--------------------------------------------------
//Update parent status
//--------------------------------------------------
const updateParentStatus = async (req, res) => {
  const { isActive } = req.body;

  const { id } = req.params;

  validateMongodbId(id);

  const parent = await Parent.findById(id);

  if (!parent) throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  parent.isActive = isActive;

  parent.save();

  return res.status(StatusCodes.OK).json(parent);
};

//--------------------------------------------------
//Delete parent
//--------------------------------------------------
const deleteParent = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const parent = await Parent.findById(id);

  if (!parent) throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  const deletedParent = await Parent.findByIdAndDelete(id);

  return res.status(StatusCodes.Ok).json(deletedParent);
};

//--------------------------------------------------
//Fetch children by parent
//--------------------------------------------------
const fetchChildrenByParent = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const parent = await Parent.findById(id).populate({
    path: "children",
    select: ["fullName", "shortName", "gender", "dob", "nic"],
    populate: { path: "classRoom", select: ["grade", "section"] },
  });

  if (!parent) throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  return res.status(StatusCodes.OK).json(parent.children);
};

module.exports = {
  registerParent,
  fetchAllParent,
  fetchParentDetail,
  updateParent,
  updateParentStatus,
  deleteParent,
  fetchChildrenByParent,
};
