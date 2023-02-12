const { validationResult } = require("express-validator");
const { CustomError } = require("../middlewares/error_middlware");

function validator(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new CustomError(
        400,
      "Invalid ( " +
        errors
          .array()
          .map((e) => e.param)
          .join(",") +
        " )"
    );
  }
}
module.exports = validator;
