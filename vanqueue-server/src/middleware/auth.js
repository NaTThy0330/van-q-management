const jwt = require("jsonwebtoken");
const config = require("../config/env");
const { HttpStatus } = require("./error");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const error = new Error("Authentication token missing");
    error.status = HttpStatus.UNAUTHORIZED;
    return next(error);
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, config.jwtSecret);
    req.user = payload;
    return next();
  } catch (_error) {
    const error = new Error("Invalid or expired token");
    error.status = HttpStatus.UNAUTHORIZED;
    return next(error);
  }
};

const authorize = (...roles) => (req, res, next) => {
  if (!req.user) {
    const error = new Error("Authentication required");
    error.status = HttpStatus.UNAUTHORIZED;
    return next(error);
  }

  if (!roles.length || roles.includes(req.user.role)) {
    return next();
  }

  const error = new Error("You do not have permission to perform this action");
  error.status = HttpStatus.FORBIDDEN;
  return next(error);
};

module.exports = {
  authenticate,
  authorize,
};
