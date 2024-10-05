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

const toggleVoteRecipe = async (
  recipeId: string,
  userId: string,
  voteType: "upvote" | "downvote"
) => {
  const recipe = await Recipe.findById(recipeId).populate("upvotes downvotes");
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  const modiFiedId = new Types.ObjectId(userId);

  // Handle upvote logic
  if (voteType === "upvote") {
    const hasUpvoted = recipe.upvotes.some((upvote) =>
      upvote.equals(modiFiedId)
    );
    if (hasUpvoted) {
      // Remove the upvote
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { upvotes: userId } },
        { new: true }
      );
    } else {
      // Add upvote and remove any downvote
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $addToSet: { upvotes: userId }, $pull: { downvotes: userId } },
        { new: true }
      );
    }
  }

  // Handle downvote logic
  if (voteType === "downvote") {
    const hasDownvoted = recipe.downvotes.some((downvote) =>
      downvote.equals(modiFiedId)
    );
    if (hasDownvoted) {
      // Remove the downvote
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $pull: { downvotes: userId } },
        { new: true }
      );
    } else {
      // Add downvote and remove any upvote
      await Recipe.findByIdAndUpdate(
        recipeId,
        { $addToSet: { downvotes: userId }, $pull: { upvotes: userId } },
        { new: true }
      );
    }
  }

  // Return updated upvote/downvote count
  const result = await Recipe.aggregate([
    { $match: { _id: recipe._id } },
    {
      $project: {
        upvoteCount: { $size: "$upvotes" },
        downvoteCount: { $size: "$downvotes" },
      },
    },
  ]);

  return result.length > 0 ? result[0] : { upvoteCount: 0, downvoteCount: 0 };
};

export const ActivityServices = {
  followUserIntoDb,
  toggleVoteRecipe,
};
