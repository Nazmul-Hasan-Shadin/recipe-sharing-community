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

    message: data.message,
    data: data.data,
  });
};

export default sendResponse;
