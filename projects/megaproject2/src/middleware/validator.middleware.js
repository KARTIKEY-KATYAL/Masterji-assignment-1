import { validationResult } from "express-validator";
import ApiError from "../utils/api-error.js";

export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {
    next();
  }

  const extractederror = [];

  errors.array().map((err) => {
    extractederror.push({
      [err.path]: err.msg,
    });
  });

  throw new ApiError(402, "Validation Failed", extractederror);
};
