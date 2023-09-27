const Teacher = require("../../model/teacher/teacher.model");
const Class = require("../../model/class/class.model");
const Student = require("../../model/student/student.model");
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
//Create timetable
//--------------------------------------------------
const createTimetable = async (req, res) => {
  const { day, classRoom, period, subject, teacher } = req.body;

  const existTimetable = await Timetable.find({
    $and: [{ day: day }, { classRoom: classRoom }, { period: period }],
  });

  if (existTimetable.length != 0)
    throw new BadRequestError(`Existing time table`);

  const foundTeacher = await Teacher.findById(teacher);

  if (!foundTeacher)
    throw new NotFoundError(`Cannot find any teacher by id: ${teacher}`);

  const foundSubject = await Subject.findById(subject);

  if (!foundSubject)
    throw new NotFoundError(`Cannot find any subject by id: ${subject}`);

  const foundClass = await Class.findById(classRoom);

  if (!foundClass)
    throw new NotFoundError(`Cannot find any classRoom by id:  ${classRoom}`);

  const timetable = await Timetable.create({
    day,
    classRoom,
    period,
    subject,
    teacher,
  });

  foundTeacher.timetable.addToSet(timetable);
  foundTeacher.save();

  return res.status(StatusCodes.CREATED).json(timetable);
};

//--------------------------------------------------
//Fetch all timetable
//--------------------------------------------------
const fetchAllTimetable = async (req, res) => {
  const timetables = await Timetable.find({});

  return res.status(StatusCodes.OK).json(timetables);
};

//--------------------------------------------------
//Fetch timetable details
//--------------------------------------------------
const fetchTimetableDetails = async (req, res) => {
  const { id } = req.params;

  //Check if valid objectId
  validateMongodbId(id);

  const timetable = await Timetable.findById(id)
    .populate({ path: "teacher", select: ["shortName"] })
    .populate({ path: "subject", select: ["name", "sinhala", "english"] });

  if (!timetable)
    throw new NotFoundError(`Cannot find any timetable by id: ${id}`);

  return res.status(StatusCodes.OK).json(timetable);
};

//--------------------------------------------------
//Fetch timetable by class
//--------------------------------------------------
const fetchTimetableByClass = async (req, res) => {
  const { classId } = req.params;

  //Check if valid objectId
  validateMongodbId(classId);

  const timetable = await Timetable.find({ classRoom: classId })
    .populate({ path: "teacher", select: ["shortName"] })
    .populate({ path: "subject", select: ["name", "sinhala", "english"] });

  if (timetable == 0) {
    throw new NotFoundError(`Cannot find any timetable by classId: ${classId}`);
  }

  return res.status(StatusCodes.OK).json(timetable);
};

//--------------------------------------------------
//Update timetable
//--------------------------------------------------
const updateTimetable = async (req, res) => {
  const { id } = req.params;

  //Check if valid objectId
  validateMongodbId(id);

  const { subject, teacher } = req.body;

  //Find teacher by id
  const foundTeacher = await Teacher.findById(teacher);

  //Validate teacher
  if (!foundTeacher)
    throw new NotFoundError(`Cannot find any teacher by id: ${teacher}`);

  const foundSubject = await Subject.findById(subject);

  if (!foundSubject)
    throw new NotFoundError(`Cannot find any subject by id: ${subject}`);

  //Find time table before update
  const timetableBeforeUpdate = await Timetable.findById(id);

  //Update timetable
  const updatedTimetable = await Timetable.findByIdAndUpdate(id, {
    subject,
    teacher,
  });

  if (timetableBeforeUpdate.teacher.toString() != teacher) {
    await Teacher.updateMany(
      { _id: timetableBeforeUpdate.teacher },
      { $pull: { timetable: { $in: [timetableBeforeUpdate._id] } } }
    );
  }

  foundTeacher.timetable.addToSet(updatedTimetable);
  foundTeacher.save();

  return res.status(StatusCodes.OK).json(updatedTimetable);
};

//--------------------------------------------------
//Fetch student timetable
//--------------------------------------------------
const fetchStudentTimetable = async (req, res) => {
  const { classId } = req.params;

  const timetable = await Timetable.find({
    classRoom: { $eq: classId },
  })
    .populate({
      path: "classRoom",
      select: ["grade", "section"],
    })
    .populate({ path: "subject", select: ["name", "sinhala", "english"] })
    .populate({
      path: "teacher",
      select: ["shortName", "registerNumber", "mobileNumber"],
    });

  return res.status(StatusCodes.OK).json(timetable);
};

//--------------------------------------------------
//Fetch teacher timetable
//--------------------------------------------------
const fetchTeacherTimetable = async (req, res) => {
  const { teacherId } = req.params;

  const teacherTimetable = await Timetable.find({})
    .populate({
      path: "classRoom",
      select: ["grade", "section"],
    })
    .populate({ path: "subject", select: ["name", "sinhala", "english"] });
};

module.exports = {
  createTimetable,
  fetchAllTimetable,
  fetchTimetableDetails,
  fetchTimetableByClass,
  updateTimetable,
  fetchStudentTimetable,
};
