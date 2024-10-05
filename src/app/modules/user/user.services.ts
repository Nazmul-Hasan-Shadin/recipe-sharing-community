import { TUser } from "./user.interface";
import { User } from "./user.model";

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
  const { userId } = userInfo;
  console.log(userInfo, "iam info");

  const user = await User.findById(userInfo);

  console.log(user, "iam user");

  const result = await User.findByIdAndUpdate(
    userId,
    {
      name: payload?.name,
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
export const UserServices = {
  createUserIntoDb,
  updateProfileIntoDb,
  getSingleUserFromDb,
};
