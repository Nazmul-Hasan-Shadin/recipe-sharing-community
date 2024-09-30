import { AppError } from "../../errors/AppError";
import { User } from "../user/user.model";

const followUserIntoDb = async (userInfo: { id: string; targetId: string }) => {
  const { id: currentUserId, targetId } = userInfo;

  console.log(userInfo.id, userInfo.targetId);

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetId);

  console.log(currentUser, "iam current user");

  if (!targetUser || !currentUser) {
    throw new AppError(404, "user is not found");
  }

  if (currentUser.following.includes(targetUser._id)) {
    throw new AppError(500, "you already followed");
  }

  currentUser.following.push(targetUser._id);
  await currentUser.save();

  targetUser.followers.push(currentUser._id);
  await targetUser.save();
};

export const ActivityServices = {
  followUserIntoDb,
};
