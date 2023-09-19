const mongoose = require("mongoose");
const { BadRequestError } = require("../errors/index");

const validateMongodbId = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) throw new BadRequestError(`User id is not a valid or found`);
};

module.exports = validateMongodbId;