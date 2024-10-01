import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Recipe } from "../Recipe/recipe.model";
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

export const upvoteRecipeIntoDB = async (recipeId: string, userId: string) => {
  const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
       throw new AppError(404,'recipe id is not found')
    }
    const userObjectId = new Types.ObjectId(userId);
    const isAlreadyUpvoted = recipe.upvotes.some((id: Types.ObjectId) => id.equals(userObjectId));
    

  return recipe;
};

export const ActivityServices = {
  followUserIntoDb,
  upvoteRecipeIntoDB,
};
