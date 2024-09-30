import config from "../../config";
import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
const loginUserIntoDb = async (userInfo: TLoginUser) => {
  const { email, password } = userInfo;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(404, "user not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    user?.password as string
  );

  if (!isPasswordCorrect) {
    throw new AppError(404, "password donnot match.try again");
  }
  const jwtPayload = {
    email,
    username: user.username,
    userId: user._id,
    role: user.role,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: "4h",
    }
  );

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: "30d",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { newPassword: string; oldPassword: string }
) => {
  const user = await User.isUserExist(userData.id);

  if (!user) {
    throw new AppError(404, "user not found");
  }

  const isPasswordCorrect = await bcrypt.compare(
    payload.oldPassword,
    user?.password as string
  );

  if (!isPasswordCorrect) {
    throw new AppError(404, "password donnot match.try again");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );

  console.log(newHashedPassword, "iam hsashed paas");

  const result = await User.findOneAndUpdate(
    {
      _id: userData.userId,
      role: userData.role,
    },
    {
      password: newHashedPassword,

      passwordChangeAt: new Date(),
    }
  );

  return result;
};

export const AuthServices = {
  loginUserIntoDb,
  changePassword,
};
