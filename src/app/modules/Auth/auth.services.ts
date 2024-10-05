import { sendEmail } from "../../../utils/SendMail";
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

const forgetPassword = async (id: string) => {
  const user = await User.isUserExist(id);

  const userStatus = user?.status;

  if (!user) {
    throw new AppError(404, "This user is not found ");
  }

  if (userStatus === "block") {
    throw new AppError(400, "This user is blocked");
  }
  const jwtPayload = {
    email: user.email,
    username: user.username,
    userId: user._id,
    role: user.role,
  };

  const resetToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: "6d",
    }
  );

  const resetUILink = `${config.reset_ui_pass_link}?id=${user._id}&token=${resetToken}`;
  console.log(resetUILink);

  sendEmail(user?.email, resetUILink);
};

const resetPasswordIntoDb = async (
  payload: { id: string; newPassword: string },
  token: string
) => {
  console.log(payload.id);

  const user = await User.isUserExist(payload.id);
  console.log(user);

  if (!user) {
    throw new AppError(404, "This user is not found ");
  }




  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string
  ) as JwtPayload;
  console.log("decoded id", decoded.userId);

  if (payload.id !== decoded.userId) {
    throw new AppError(401, "Your are forbidden");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );
  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,

      passwordChangeAt: new Date(),
    }
  );
};

export const AuthServices = {
  loginUserIntoDb,
  changePassword,
  forgetPassword,
  resetPasswordIntoDb
  
};
