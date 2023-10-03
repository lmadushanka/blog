const Class = require("../../model/class/class.model");
const { StatusCodes } = require("http-status-codes");
const validateMongodbId = require("../../utils/validateMongodbID");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");

//!--------------------------------------------------
//! Create class
//!--------------------------------------------------
const createClass = async (req, res) => {
  const { classNumber, grade, section } = req.body;

  if (!classNumber || !grade || !section) {
    throw new BadRequestError(`Please provide all required records`);
  }

  //Check id duplicate class room
  const duplicateClassRoom = await Class.find({
    $and: [{ grade: grade }, { section: section }],
  });

  if (duplicateClassRoom.length != 0)
    throw new BadRequestError(`Class room is already exist`);

  const createdClass = await Class.create({ classNumber, grade, section });

  return res.status(StatusCodes.CREATED).json(createdClass);
};

//!--------------------------------------------------
//! Fetch all classes
//!--------------------------------------------------
const fetchAllClasses = async (req, res) => {
  const classes = await Class.find({}).sort({ grade: +1, section: +1 });

  return res.status(StatusCodes.OK).json(classes);
};

//!--------------------------------------------------
//! Fetch class details
//!--------------------------------------------------
const fetchClassDetails = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const classRoom = await Class.findById(id)
    .populate("subjects")
    .populate("teachers");

  if (!classRoom)
    throw new NotFoundError(`Cannot find the class room by _id: ${id}`);

  return res.status(StatusCodes.Ok).json(classRoom);
};

//!--------------------------------------------------
//! Update class room
//!--------------------------------------------------
const updateClass = async (req, res) => {
  const { id } = req.params;
  const { grade, section } = req.body;

  validateMongodbId(id);

  if (!grade || !section)
    throw new BadRequestError(`Please provide required record`);

  const classRoom = await Class.findById(id);

  if (!classRoom)
    throw new NotFoundError(`Cannot find the class room by _id: ${id}`);

  //Check id duplicate class room
  const duplicateClassRoom = await Class.find({
    $and: [{ grade: grade }, { section: section }],
  });

  if (duplicateClassRoom != 0)
    throw new BadRequestError(`Class room is already exist`);

  classRoom.grade = grade;
  classRoom.section = section;

  const updatedClassRoom = await classRoom.save();

  return res.status(StatusCodes.OK).json(updatedClassRoom);
};

//!--------------------------------------------------
//! Update class room status
//!--------------------------------------------------
const updateClassStatus = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;

  validateMongodbId(id);

  if (isActive == null)
    throw new BadRequestError(`Please provide required record`);

  const classRoom = await Class.findById(id);

  if (!classRoom)
    throw new NotFoundError(`Cannot find the class room by _id: ${id}`);

  classRoom.isActive = isActive;

  const updatedClassRoom = await classRoom.save();

  return res.status(StatusCodes.OK).json(updatedClassRoom);
};

//!--------------------------------------------------
//! Delete class room
//!--------------------------------------------------
const deleteClass = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const classRoom = await Class.findById(id);

  if (!classRoom)
    throw new NotFoundError(`Cannot find the class room by _id: ${id}`);

  const deletedClassRoom = await Class.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json(deletedClassRoom);
};

//!--------------------------------------------------
//! Fetch class rooms by grade
//!--------------------------------------------------
const fetchClassRoomsByGrade = async (req, res) => {
  const { grade } = req.params;

  const classRooms = await Class.find({ grade: grade });

  if (classRooms.length == 0)
    throw new NotFoundError(`Cannot find any class rooms by grade: ${grade}`);

  return res.status(StatusCodes.OK).json(classRooms);
};

module.exports = {
  createClass,
  fetchAllClasses,
  fetchClassDetails,
  updateClassStatus,
  updateClass,
  deleteClass,
  fetchClassRoomsByGrade,
};
