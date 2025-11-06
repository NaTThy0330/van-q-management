const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = HttpStatus.NOT_FOUND;
  next(error);
};
const errorHandler = (err, req, res, _next) => {
  const status = err.status || HttpStatus.INTERNAL_SERVER_ERROR;
  const response = {
    success: false,
    message: err.message || "Internal server error",
  };

  if (req.app.get("env") !== "production" && err.stack) {
    response.stack = err.stack;
    response.details = err.details;
  }

  res.status(status).json(response);
};

module.exports = {
  notFoundHandler,
  errorHandler,
  HttpStatus,
};
