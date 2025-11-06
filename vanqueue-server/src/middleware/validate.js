const { HttpStatus } = require("./error");

const validate =
  (schema, property = "body") =>
  (req, res, next) => {
    const { error, value } = schema.validate(req[property], {
      abortEarly: false,
      stripUnknown: true,
    });

    if (error) {
      const err = new Error("Validation failed");
      err.status = HttpStatus.BAD_REQUEST;
      err.details = error.details.map(({ message, context }) => ({
        message,
        path: context?.key,
      }));
      return next(err);
    }

    req[property] = value;
    return next();
  };

module.exports = validate;
