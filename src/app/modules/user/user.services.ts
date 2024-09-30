import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDb = async (userInfo: TUser) => {
  const result = await User.create(userInfo);
  return result;
};

export const UserServices = {
  createUserIntoDb,
};
