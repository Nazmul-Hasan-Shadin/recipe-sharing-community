import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Recipe } from "../recipe/recipe.model";
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

const upvoteRecipe = async (recipeId: string, userId: string) => {
  const recipe = await Recipe.findById(recipeId).populate("upvotes");
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  const modiFiedId = new Types.ObjectId(userId);

  // // Check if the user has already upvoted
  const hasUpvoted = recipe.upvotes.some((upvote) => upvote.equals(modiFiedId));

  console.log(hasUpvoted);

  if (hasUpvoted) {
    // Remove the upvote (user is toggling the upvote off)
    await Recipe.findByIdAndUpdate(
      recipeId,
      { $pull: { upvotes: userId } },
      { new: true }
    );
  } else {
    await Recipe.findByIdAndUpdate(
      recipeId,
      { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } }, // Remove any downvote by the user
      { new: true }
    );
  }


  const result = await Recipe.aggregate([
    { $match: { _id: recipeId } }, // Match the recipe by its ID
    {
      $project: {
        _id: 1,
        upvoteCount: { $size: "$upvotes" }, // Get the count of upvotes
        downvoteCount: { $size: "$downvotes" }, 
      },
    },
  ]);

  console.log(result);

  // Return the updated upvote count
  return result.length > 0 ? result[0].upvoteCount : 0;
};

export const ActivityServices = {
  followUserIntoDb,
  upvoteRecipe,
};
