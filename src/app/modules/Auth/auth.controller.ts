import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import config from "../../config";
import { AuthServices } from "./auth.services";

const loginUser = catchAsync(async (req, res) => {
  const userInfo = req.body;

  const result = await AuthServices.loginUserIntoDb(userInfo);
  const { accessToken, refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
  });

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user Logged In succesfull",
    data: {
      accessToken,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const payload = req.body;
  const userData = req.user;

  const result = await AuthServices.changePassword(userData, payload);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "password changed succesfull",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthServices.forgetPassword(req.user.userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Reset token is retrieved successfully",
    data: result,
  });
});

const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthServices.resetPasswordIntoDb(
    req.body,
    token as string
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Password reset successfully",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  resetPassword,
  forgetPassword,
};
