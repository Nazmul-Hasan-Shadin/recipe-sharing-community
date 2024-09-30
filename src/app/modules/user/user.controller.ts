import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  const userInfo = req.body;
  const result = await UserServices.createUserIntoDb(userInfo);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user created succesfull",
    data: result,
  });
});

export const UserController = {
  createUser,
};
