import catchAsync from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { UserServices } from "./user.services";

const createUser = catchAsync(async (req, res) => {


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

// const getSingleUser = catchAsync(async (req, res) => {
//   console.log("iam hit");

//   console.log(req.params);

//   const userId = req.params.userId;

//   const result = await UserServices.getSingleUserFromDb(userId);

//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "user retrived succesfull",
//     data: result,
//   });
// });

export const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb();

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "user retrived succesfull",
    data: result,
  });
});

const deleteUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await UserServices.deleteUserFromDb(userId);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User deleted successful",
    data: result,
  });
});

const changeUserStatus = catchAsync(async (req, res) => {
  console.log(req.params.userId);

  const { status } = req.body;

  // Call the service function to update the user's status
  const result = await UserServices.changeUserStatusInDb(
    req.params.userId,
    status
  );

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: "User status updated successfully",
    data: result.user,
  });
});

export const UserController = {
  createUser,
  updateUser,
  getSingleUser,
  getAllUsers,
  deleteUser,
  changeUserStatus,
};
