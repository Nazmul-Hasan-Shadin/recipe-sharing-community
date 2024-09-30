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

export const AuthController = {
  loginUser,
  changePassword,
};
