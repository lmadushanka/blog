const jwt = require("jsonwebtoken");
const {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} = require("../../errors/index");
const User = require("../../model/user/user.model");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError(
      `Cannot find any authorized token, login again`
    );
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    throw new UnAuthenticatedError(`Authorized token expired, login again`);
  }
};

const authAdmin = async (req, res, next) => {
  if (!req.user.isAdmin) {
    throw new UnAuthenticatedError(`Access denied`);
  }
  next();
};

module.exports = {
  authAdmin,
  authMiddleware,
};
