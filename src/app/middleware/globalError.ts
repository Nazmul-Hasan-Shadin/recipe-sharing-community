import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import { TErrorSource } from "../interface/error";
import mongooseErrorHandler from "../errors/mongooseErrorHandler";

/* eslint-disable  no-explicit-any */
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
): any => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  let errorSources: TErrorSource[] = [
    {
      path: "",
      message: "something went wrong",
    },
  ];

  if (err instanceof mongoose.Error.ValidationError) {
    const simplitfyError = mongooseErrorHandler(err);
    message = simplitfyError.message;
    statusCode = simplitfyError.statusCode;
    errorSources = simplitfyError.errorSource;
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
  });
};

export default globalErrorHandler;
