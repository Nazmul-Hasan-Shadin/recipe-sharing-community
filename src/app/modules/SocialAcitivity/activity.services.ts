import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Recipe } from "../recipe/recipe.model";
import { User } from "../user/user.model";

const followUserIntoDb = async (userInfo: { id: string; targetId: string }) => {
  const { id: currentUserId, targetId } = userInfo;

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetId);

  if (!targetUser || !currentUser) {
    throw new AppError(404, "User is not found");
  }

  const isFollowing = currentUser.following.includes(targetUser._id);

  if (isFollowing) {
    // Unfollow the target user
    await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { following: targetUser._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetId,
      { $pull: { followers: currentUser._id } },
      { new: true }
    );
  } else {
    // Follow the target user
    await User.findByIdAndUpdate(
      currentUserId,
      { $addToSet: { following: targetUser._id } }, // Add target user to following
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetId,
      { $addToSet: { followers: currentUser._id } }, // Add current user to target user's followers
      { new: true }
    );
  }
};

export const getFollowingStatus = async (
  currentUserId: string,
  targetUserId: string
) => {
  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);
  console.log(currentUser, targetUser, "target");

  if (!currentUser || !targetUser) {
    throw new AppError(404, "User not found");
  }

  const isFollowing = currentUser.following.includes(targetUser._id);
  return { isFollowing };
};

// Export the service

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
  getFollowingStatus,
};
