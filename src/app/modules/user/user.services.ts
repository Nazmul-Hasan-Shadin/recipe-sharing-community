import { AppError } from "../../errors/AppError";
import { TUser } from "./user.interface";
import { User } from "./user.model";
type UserStatus = "block" | "active";

const createUserIntoDb = async (userInfo: TUser) => {
  const result = await User.create(userInfo);

  return result;
};

const updateProfileIntoDb = async (
  userInfo: any,
  payload: {
    name?: string;
    email?: string;
    profilePicture?: string;
    bio?: string;
  }
) => {

  console.log(userInfo);
  
  const { userId } = userInfo;

  const user = await User.findById(userInfo.userId);


  const result = await User.findByIdAndUpdate(
    userInfo.userId,
    {
      username: payload?.name,
      profilePicture: payload?.profilePicture,
      bio: payload?.bio,
    },
    {
      new: true,
    }
  );

  return result;
};

const getSingleUserFromDb = async (userId: string) => {
  const result = await User.findById(userId);

  return result;
};

const getAllUsersFromDb = async () => {
  const result = await User.find();

  return result;
};
const deleteUserFromDb = async (userId: string) => {
  // Check if the user exists

  const user = await User.findById(userId);

  if (!user) {
    throw new AppError(404, "User not found");
  }

  // Delete the user using deleteOne
  const result = await User.deleteOne({ _id: userId });

  return result;
};

const getSingleUserByEmailFromDb = async (email: string) => {
  const result = await User.find({
    email: email,
  });

  return result;
};

export const changeUserStatusInDb = async (
  userId: string,
  status: UserStatus
) => {
  console.log(userId, status, "User ID and status");

  // Find the user and update their status
  const user = await User.findByIdAndUpdate(
    userId,
    { status },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(404, "User not found");
  }

  return { message: "User status updated successfully", user };
};

export const UserServices = {
  createUserIntoDb,
  updateProfileIntoDb,
  getSingleUserFromDb,
  getSingleUserByEmailFromDb,
  getAllUsersFromDb,
  deleteUserFromDb,
  changeUserStatusInDb,
};
