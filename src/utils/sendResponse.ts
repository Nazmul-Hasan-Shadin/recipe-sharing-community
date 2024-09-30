import { Response } from "express";

const sendResponse = <T>(
  res: Response,
  data: {
    message?: string;
    statusCode: number;
    success: boolean;
    data: T;
  }
) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
  });
};

export default sendResponse;
