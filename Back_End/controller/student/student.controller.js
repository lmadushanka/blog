const Student = require("../../model/student/student.model");
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
//Register student
//--------------------------------------------------
const registerStudent = async (req, res) => {
  const {
    registerNumber,
    fullName,
    shortName,
    classRoom,
    parent,
    gender,
    dob,
    enrolmentDate,
    nic,
  } = req.body;

  if (
    !registerNumber ||
    !fullName ||
    !shortName ||
    !classRoom ||
    !parent ||
    !gender ||
    !dob ||
    !enrolmentDate
  ) {
    throw new BadRequestError(`Please provide all required records`);
  }

  const foundParent = await Parent.findById(parent);

  if (!foundParent)
    throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  const foundClassRoom = await Class.findById(classRoom);

  if (!foundClassRoom)
    throw new NotFoundError(`Cannot find any classRoom by id: ${classRoom}`);

  const student = await Student.create({
    registerNumber,
    fullName,
    shortName,
    classRoom,
    parent,
    gender,
    dob,
    enrolmentDate,
    nic,
  });

  foundParent.children.addToSet(student);

  foundParent.save();

  return res.status(StatusCodes.CREATED).json(student);
};

//--------------------------------------------------
//Fetch all student
//--------------------------------------------------
const fetchAllStudent = async (req, res) => {
  const StudentSchema = await Student.find({});

  return res.status(StatusCodes.OK).json(StudentSchema);
};

//--------------------------------------------------
//Fetch student details
//--------------------------------------------------
const fetchStudentDetail = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const student = await Student.findById(id)
    .populate({
      path: "parent",
      select: [
        "name",
        "mobileNumber",
        "landPhoneNumber",
        "alternativeNumber",
        "presentAddress",
        "relationship",
      ],
    })
    .populate({ path: "classRoom", select: ["grade", "section"] });

  if (!student) throw new NotFoundError(`Cannot find any student by id: ${id}`);

  return res.status(StatusCodes.OK).json(student);
};

//--------------------------------------------------
//Fetch student by classRoom
//--------------------------------------------------
const fetchStudentByClass = async (req, res) => {
  const { classId } = req.params;

  validateMongodbId(classId);

  const classRoom = await Class.findById(classId);

  if (!classRoom)
    throw new NotFoundError(`Cannot find any class by id: ${classId}`);

  const students = await Student.find({ classRoom: classId });

  return res.status(StatusCodes.OK).json(students);
};

//--------------------------------------------------
//Update student
//--------------------------------------------------
const updateStudent = async (req, res) => {
  const { id } = req.params;

  const {
    registerNumber,
    fullName,
    shortName,
    classRoom,
    parent,
    gender,
    dob,
    enrolmentDate,
    nic,
  } = req.body;

  //Validate user inputs
  if (
    !registerNumber ||
    !fullName ||
    !shortName ||
    !classRoom ||
    !parent ||
    !gender ||
    !dob ||
    !enrolmentDate
  ) {
    throw new BadRequestError(`Please provide all required records`);
  }

  //Check valid objectId
  validateMongodbId(classRoom);
  validateMongodbId(parent);

  //Checking whether the entered parent information is available
  const foundParent = await Parent.findById(parent);

  if (!foundParent)
    throw new NotFoundError(`Cannot find any parent by id: ${id}`);

  //Checking whether the entered classRoom information is available
  const foundClassRoom = await Class.findById(classRoom);

  if (!foundClassRoom)
    throw new NotFoundError(`Cannot find any classRoom by id: ${classRoom}`);

  //Find the student
  const student = await Student.findById(id);

  //Remove children information if change parent
  if (student.parent != parent) {
    await Parent.updateMany(
      { _id: student.parent },
      { $pull: { children: { $in: [student._id] } } }
    );
  }

  //Add student to parent children record
  foundParent.children.addToSet(student);

  foundParent.save();

  //Update student
  const updatedStudent = await Student.findByIdAndUpdate(id, {
    registerNumber,
    fullName,
    shortName,
    classRoom,
    parent,
    gender,
    dob,
    enrolmentDate,
    nic,
  });

  res.status(StatusCodes.OK).json(updatedStudent);
};

//--------------------------------------------------
//Delete student
//--------------------------------------------------
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const student = await Student.findById(id);

  if (!student) throw new NotFoundError(`Cannot find any student by id: ${id}`);

  await Parent.updateMany(
    { _id: student.parent },
    { $pull: { children: { $in: [student._id] } } }
  );

  const deletedStudent = await Student.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json(deletedStudent);
};

//--------------------------------------------------
//Update student status
//--------------------------------------------------
const updateStudentStatus = async (req, res) => {
  const { isActive } = req.body;

  const { id } = req.params;

  //Check valid objectId
  validateMongodbId(id);

  //check wether the entered student information is available
  const student = await Student.findById(id);

  if (!student) throw new NotFoundError(`Cannot find any student bt id: ${id}`);

  student.isActive = isActive;

  student.save();

  return res.status(StatusCodes.OK).json(student);
};

module.exports = {
  registerStudent,
  fetchAllStudent,
  fetchStudentDetail,
  fetchStudentByClass,
  updateStudent,
  deleteStudent,
  updateStudentStatus,
};
