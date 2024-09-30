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

const updateUser = catchAsync(async (req, res) => {
  const paylod = req.body;

  const result = await UserServices.updateProfileIntoDb(req.user, paylod);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user updated succesfull",
    data: result,
  });
});
export const UserController = {
  createUser,
  updateUser,
};
