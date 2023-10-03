const Subject = require("../../model/subject/subject.model");
const { StatusCodes } = require("http-status-codes");
const validateMongodbId = require("../../utils/validateMongodbID");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");
const { isValidObjectId } = require("mongoose");

//!--------------------------------------------------
//! Create subject
//!--------------------------------------------------
const createSubject = async (req, res) => {
  const { subjectNumber, name, sinhala, english } = req.body;

  if (!subjectNumber || !name || !sinhala || !english)
    throw new BadRequestError(`Please provide all required records`);

  const foundSubject = await Subject.find({ name: name });

  if (foundSubject.length != 0) {
    throw new BadRequestError(`Subject is already exist`);
  }

  const createdSubject = await Subject.create({
    subjectNumber,
    name,
    sinhala,
    english,
  });

  return res.status(StatusCodes.CREATED).json(createdSubject);
};

//!--------------------------------------------------
//! Fetch all subject
//!--------------------------------------------------
const fetchAllSubject = async (req, res) => {
  const subjects = await Subject.find({});

  return res.status(StatusCodes.OK).json(subjects);
};

//!--------------------------------------------------
//! Fetch subject details
//!--------------------------------------------------
const fetchSubjectDetails = async (req, res) => {
  const { id } = req.params;

  validateMongodbId(id);

  const subject = await Subject.findById(id)
    .populate("classes")
    .populate("teachers");

  if (!subject) throw new NotFoundError(`Cannot find subject by _id: ${id}`);

  return res.status(StatusCodes.OK).json(subject);
};

//!--------------------------------------------------
//! Fetch subjects by language
//!--------------------------------------------------
const fetchSubjectsByLanguage = async (req, res) => {
  const { language } = req.params;

  let subject = "";

  if (language == "sinhala") {
    subject = await Subject.find({ sinhala: true });
  } else {
    subject = await Subject.find({ english: true });
  }

  res.status(StatusCodes.OK).json(subject);
};

//!--------------------------------------------------
//! Update subjects
//!--------------------------------------------------
const updateSubject = async (req, res) => {
  const { subjectNumber, name, sinhala, english } = req.body;

  const { id } = req.params;

  isValidObjectId(id);

  if (!subjectNumber || !name || !sinhala || !english)
    throw new BadRequestError(`Please provide all required records`);

  const subject = await Subject.findById(id);

  if (!subject) {
    throw new NotFoundError(`Cannot find any subject by id: ${id}`);
  }

  subject.name = name;
  subject.sinhala = sinhala;
  subject.english = english;
  subject.save();

  return res.status(StatusCodes.OK).json(subject);
};

//!--------------------------------------------------
//! Update subjects status
//!--------------------------------------------------
const updateSubjectStatus = async (req, res) => {
  const { isActive } = req.body;
  const { id } = req.params;

  isValidObjectId(id);

  const subject = await Subject.findById(id);

  if (!subject) throw new NotFoundError(`Cannot find any subject by id: ${id}`);

  subject.isActive = isActive;
  subject.save();

  return res.status(StatusCodes.OK).json(subject);
};

//!--------------------------------------------------
//! Delete subjects
//!--------------------------------------------------
const deleteSubject = async (req, res) => {
  const { id } = req.params;

  isValidObjectId(id);

  const subject = await Subject.findById(id);

  if (!subject) throw new NotFoundError(`Cannot find any subject by id: ${id}`);

  const deletedSubject = await Subject.findByIdAndDelete(id);

  return res.status(StatusCodes.OK).json(deletedSubject);
};

module.exports = {
  createSubject,
  fetchAllSubject,
  fetchSubjectDetails,
  fetchSubjectsByLanguage,
  updateSubject,
  updateSubjectStatus,
  deleteSubject,
};
