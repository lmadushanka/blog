const Teacher = require("../../model/teacher/teacher.model");
const Class = require("../../model/class/class.model");
const Subject = require("../../model/subject/subject.model");
const Timetable = require("../../model/timetable/timetable.model");
const { StatusCodes } = require("http-status-codes");
const validateMongodbId = require("../../utils/validateMongodbID");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");

//--------------------------------------------------
//Register student
//--------------------------------------------------
const registerTeacher = async (req, res) => {
  const {
    registerNumber,
    fullName,
    shortName,
    dob,
    gender,
    email,
    nic,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    permanentAddress,
    presentAddress,
    appointmentDate,
    lastAppointment,
  } = req.body;

  //Validate user inputs
  if (
    !registerNumber ||
    !fullName ||
    !shortName ||
    !dob ||
    !gender ||
    !email ||
    !nic ||
    !mobileNumber ||
    !permanentAddress ||
    !presentAddress ||
    !appointmentDate ||
    !lastAppointment
  ) {
    throw new BadRequestError(`Please provide all required records`);
  }

  const teacher = await Teacher.create({
    registerNumber,
    fullName,
    shortName,
    dob,
    gender,
    email,
    nic,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    permanentAddress,
    presentAddress,
    appointmentDate,
    lastAppointment,
  });

  return res.status(StatusCodes.CREATED).json(teacher);
};

//--------------------------------------------------
//Fetch all teachers
//--------------------------------------------------
const fetchAllTeachers = async (req, res) => {
  const teachers = await Teacher.find({});

  return res.status(StatusCodes.OK).json(teachers);
};

//--------------------------------------------------
//Fetch teacher details
//--------------------------------------------------
const fetchTeacherDetails = async (req, res) => {
  const { id } = req.params;

  //check valid objectId
  validateMongodbId(id);

  const teacher = await Teacher.findById(id).populate({
    path: "timetable",
    select: ["day", "period"],
    populate: [
      { path: "subject", select: ["name", "sinhala", "english"] },
      { path: "classRoom", select: ["grade", "section"] },
    ],
  });

  if (!teacher) throw new NotFoundError(`Cannot find any teacher by id: ${id}`);

  return res.status(StatusCodes.OK).json(teacher);
};

//--------------------------------------------------
//Update teacher
//--------------------------------------------------
const updateTeacher = async (req, res) => {
  const { id } = req.params;

  //Check valid objectId
  validateMongodbId(id);

  const {
    registerNumber,
    fullName,
    shortName,
    dob,
    gender,
    email,
    nic,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    permanentAddress,
    presentAddress,
    appointmentDate,
    lastAppointment,
  } = req.body;

  //Validate user inputs
  if (
    !registerNumber ||
    !fullName ||
    !shortName ||
    !dob ||
    !gender ||
    !email ||
    !nic ||
    !mobileNumber ||
    !permanentAddress ||
    !presentAddress ||
    !appointmentDate ||
    !lastAppointment
  ) {
    throw new BadRequestError(`Please provide all required records`);
  }

  const teacher = await Teacher.findByIdAndUpdate(id, {
    registerNumber,
    fullName,
    shortName,
    dob,
    gender,
    email,
    nic,
    mobileNumber,
    landPhoneNumber,
    alternativeNumber,
    permanentAddress,
    presentAddress,
    appointmentDate,
    lastAppointment,
  });

  return res.status(StatusCodes.OK).json(teacher);
};

//--------------------------------------------------
//Update teacher status
//--------------------------------------------------
const updateTeacherStatus = async (req, res) => {
  const { id, isActive } = req.params;

  console.log(isActive);

  //check valid objectId
  validateMongodbId(id);

  const teacher = await Teacher.findById(id);

  if (!teacher) throw new NotFoundError(`Cannot find any teacher by id: ${id}`);

  teacher.isActive = isActive;
  teacher.save();

  return res.status(StatusCodes.OK).json(teacher);
};

//--------------------------------------------------
//Delete Teacher
//--------------------------------------------------
const deleteTeacher = async (req, res) => {
  const { id } = req.params;
  //Check if valid objectId
  validateMongodbId(id);

  const teacher = await Teacher.findById(id);

  if (!teacher) throw new NotFoundError(`Cannot find any teacher by id: ${id}`);

  const deletedTeacher = await Teacher.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json(deletedTeacher);
};

module.exports = {
  registerTeacher,
  fetchAllTeachers,
  fetchTeacherDetails,
  updateTeacher,
  updateTeacherStatus,
  deleteTeacher,
};
