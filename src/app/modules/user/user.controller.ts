import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {
  console.log(req.body, "iam body");
  console.log(req.file, "iam file");
  //

  const userInfo = req.body;
  const result = await UserServices.createUserIntoDb({
    ...JSON.parse(req.body.data),
    profilePicture: req.file?.path,
  });

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

const getSingleUser = catchAsync(async (req, res) => {
  const userId = req.params.userId;

  const result = await UserServices.getSingleUserFromDb(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user retrived succesfull",
    data: result,
  });
});
export const UserController = {
  createUser,
  updateUser,
  getSingleUser,
};
