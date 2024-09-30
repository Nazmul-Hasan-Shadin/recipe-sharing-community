import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";

const mongooseErrorHandler = (
  err: mongoose.Error.ValidationError
): TGenericErrorResponse => {
  const errorSource = Object.values(err.errors).map((val) => {
    return {
      path: val?.path,
      message: val?.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: "mongoose validation error",
    errorSource,
  };
};

export default mongooseErrorHandler;
