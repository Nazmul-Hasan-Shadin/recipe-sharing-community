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
    profilePicture: user?.profilePicture,
  };

  const accessToken = jwt.sign(
    jwtPayload,
    config.jwt_access_token_secret as string,
    {
      expiresIn: "4d",
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
  console.log(userData, "iam userData");

  const user = await User.isUserExist(userData.userId);

  console.log("iam inside service", user);

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

const forgetPassword = async (email: string) => {
  // const user = await User.isUserExist(id);

  const user = await User.findOne({ email: email });
  console.log(user, "iam user");

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
    profilePicture: user?.profilePicture,
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

  sendEmail(user?.email, resetUILink)
    .then(() => console.log("Email sent successfully"))
    .catch((error) => console.error("Error sending email:", error));
};

const resetPasswordIntoDb = async (
  payload: { userId: string; newPassword: string; token: string },
  token: string
) => {
  // const user = await User.isUserExist(payload.id);
  console.log(payload.userId);

  const user = await User.findById(payload.userId);
  console.log(user, "iam user");

  if (!user) {
    throw new AppError(404, "This user is not found ");
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_token_secret as string
  ) as JwtPayload;

  if (payload.userId !== decoded.userId) {
    throw new AppError(401, "Your are forbidden");
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt)
  );
  const result = await User.findOneAndUpdate(
    {
      _id: decoded.userId,
    },
    {
      password: newHashedPassword,
    }
  );

  return result;
};

export const AuthServices = {
  loginUserIntoDb,
  changePassword,
  forgetPassword,
  resetPasswordIntoDb,
};
