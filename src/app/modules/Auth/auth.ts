import catchAsync from "../../../utils/catchAsync";
import config from "../../config";
import { AppError } from "../../errors/AppError";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";

export const auth = (...requiredRole: string[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(401, "you have no access to this route");
    }

    // let verify token

    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token_secret as string
      ) as JwtPayload;
    } catch (_error) {
      throw new AppError(401, "unauthorized");
    }

    const { role, userId } = decoded;

    const user = await User.isUserExist(userId);
    if (!user) {
      throw new AppError(404, "user not found");
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(403, "you are not authorize");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};
