import { Types } from "mongoose";
import { AppError } from "../../errors/AppError";
import { Recipe } from "../recipe/recipe.model";
import { User } from "../user/user.model";

import mongoose from "mongoose";

const followUserIntoDb = async (userInfo: { id: string; targetId: string }) => {
  const { id: currentUserId, targetId } = userInfo;

  // Convert string IDs to ObjectId
  const currentUserObjectId = new mongoose.Types.ObjectId(currentUserId);
  const targetUserObjectId = new mongoose.Types.ObjectId(targetId);

  const currentUser = await User.findById(currentUserObjectId);
  const targetUser = await User.findById(targetUserObjectId);

  if (!targetUser || !currentUser) {
    throw new AppError(404, "User is not found");
  }

  const targetUserIdAsObjectId = new mongoose.Types.ObjectId(
    targetUser._id as string
  );

  const isFollowing = currentUser.following.includes(targetUserIdAsObjectId);

  if (isFollowing) {
    // Unfollow the target user
    await User.findByIdAndUpdate(
      currentUserObjectId,
      { $pull: { following: targetUser._id } },
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetUserObjectId,
      { $pull: { followers: currentUser._id } },
      { new: true }
    );
  } else {
    // Follow the target user
    await User.findByIdAndUpdate(
      currentUserObjectId,
      { $addToSet: { following: targetUser._id } }, // Add target user to following
      { new: true }
    );
    await User.findByIdAndUpdate(
      targetUserObjectId,
      { $addToSet: { followers: currentUser._id } }, // Add current user to target user's followers
      { new: true }
    );
  }
};

export const getFollowingStatus = async (
  currentUserId: string,
  targetUserId: string
) => {
  // Convert string IDs to ObjectId
  const currentUserObjectId = new Types.ObjectId(currentUserId);
  const targetUserObjectId = new Types.ObjectId(targetUserId);

  const currentUser = await User.findById(currentUserObjectId);
  const targetUser = await User.findById(targetUserObjectId);
  console.log(currentUser, targetUser, "target");

  if (!currentUser || !targetUser) {
    throw new AppError(404, "User not found");
  }

  const targetUserIdAsObjectId = new mongoose.Types.ObjectId(
    targetUser._id as string
  );
  const isFollowing = currentUser.following.some(
    (followingId: mongoose.Types.ObjectId) =>
      followingId.equals(targetUserIdAsObjectId)
  );

  return { isFollowing };
};
// Export the service

const toggleVoteRecipe = async (
  recipeId: string,
  userId: string,
  voteType: "upvote" | "downvote"
) => {
  // Ensure that the recipe ID and user ID are treated as ObjectId types
  const recipeObjectId = new Types.ObjectId(recipeId);
  const userObjectId = new Types.ObjectId(userId);

  const recipe = await Recipe.findById(recipeObjectId).populate(
    "upvotes downvotes"
  );
  if (!recipe) {
    throw new Error("Recipe not found");
  }

  // Handle upvote logic
  if (voteType === "upvote") {
    const upvotes = recipe.upvotes as mongoose.Types.ObjectId[] | undefined; // Type assertion to ObjectId[] or undefined
    const hasUpvoted = upvotes
      ? upvotes.some((upvote) => upvote.equals(userObjectId))
      : false; // Check if upvotes exists
    // const hasUpvoted = recipe.upvotes!.some((upvote: mongoose.Types.ObjectId) =>
    //   upvote.equals(userObjectId)
    // );
    if (hasUpvoted) {
      // Remove the upvote
      await Recipe.findByIdAndUpdate(
        recipeObjectId,
        { $pull: { upvotes: userObjectId } },
        { new: true }
      );
    } else {
      // Add upvote and remove any downvote
      await Recipe.findByIdAndUpdate(
        recipeObjectId,
        {
          $addToSet: { upvotes: userObjectId },
          $pull: { downvotes: userObjectId },
        },
        { new: true }
      );
    }
  }

  // Handle downvote logic
  if (voteType === "downvote") {
    const downvotes = recipe.downvotes as mongoose.Types.ObjectId[] | undefined;
    const hasDownvoted = downvotes
      ? downvotes.some((downvote) => downvote.equals(userObjectId))
      : false;
    if (hasDownvoted) {
      // Remove the downvote
      await Recipe.findByIdAndUpdate(
        recipeObjectId,
        { $pull: { downvotes: userObjectId } },
        { new: true }
      );
    } else {
      // Add downvote and remove any upvote
      await Recipe.findByIdAndUpdate(
        recipeObjectId,
        {
          $addToSet: { downvotes: userObjectId },
          $pull: { upvotes: userObjectId },
        },
        { new: true }
      );
    }
  }

  // Return updated upvote/downvote count
  const result = await Recipe.aggregate([
    { $match: { _id: recipeObjectId } },
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
