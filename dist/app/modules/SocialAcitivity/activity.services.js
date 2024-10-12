"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityServices = exports.getFollowingStatus = void 0;
const mongoose_1 = require("mongoose");
const AppError_1 = require("../../errors/AppError");
const recipe_model_1 = require("../recipe/recipe.model");
const user_model_1 = require("../user/user.model");
const mongoose_2 = __importDefault(require("mongoose"));
const followUserIntoDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: currentUserId, targetId } = userInfo;
    // Convert string IDs to ObjectId
    const currentUserObjectId = new mongoose_2.default.Types.ObjectId(currentUserId);
    const targetUserObjectId = new mongoose_2.default.Types.ObjectId(targetId);
    const currentUser = yield user_model_1.User.findById(currentUserObjectId);
    const targetUser = yield user_model_1.User.findById(targetUserObjectId);
    if (!targetUser || !currentUser) {
        throw new AppError_1.AppError(404, "User is not found");
    }
    const targetUserIdAsObjectId = new mongoose_2.default.Types.ObjectId(targetUser._id);
    const isFollowing = currentUser.following.includes(targetUserIdAsObjectId);
    if (isFollowing) {
        // Unfollow the target user
        yield user_model_1.User.findByIdAndUpdate(currentUserObjectId, { $pull: { following: targetUser._id } }, { new: true });
        yield user_model_1.User.findByIdAndUpdate(targetUserObjectId, { $pull: { followers: currentUser._id } }, { new: true });
    }
    else {
        // Follow the target user
        yield user_model_1.User.findByIdAndUpdate(currentUserObjectId, { $addToSet: { following: targetUser._id } }, // Add target user to following
        { new: true });
        yield user_model_1.User.findByIdAndUpdate(targetUserObjectId, { $addToSet: { followers: currentUser._id } }, // Add current user to target user's followers
        { new: true });
    }
});
const getFollowingStatus = (currentUserId, targetUserId) => __awaiter(void 0, void 0, void 0, function* () {
    // Convert string IDs to ObjectId
    const currentUserObjectId = new mongoose_1.Types.ObjectId(currentUserId);
    const targetUserObjectId = new mongoose_1.Types.ObjectId(targetUserId);
    const currentUser = yield user_model_1.User.findById(currentUserObjectId);
    const targetUser = yield user_model_1.User.findById(targetUserObjectId);
    if (!currentUser || !targetUser) {
        throw new AppError_1.AppError(404, "User not found");
    }
    const targetUserIdAsObjectId = new mongoose_2.default.Types.ObjectId(targetUser._id);
    const isFollowing = currentUser.following.some((followingId) => followingId.equals(targetUserIdAsObjectId));
    return { isFollowing };
});
exports.getFollowingStatus = getFollowingStatus;
// Export the service
const toggleVoteRecipe = (recipeId, userId, voteType) => __awaiter(void 0, void 0, void 0, function* () {
    // Ensure that the recipe ID and user ID are treated as ObjectId types
    const recipeObjectId = new mongoose_1.Types.ObjectId(recipeId);
    const userObjectId = new mongoose_1.Types.ObjectId(userId);
    const recipe = yield recipe_model_1.Recipe.findById(recipeObjectId).populate("upvotes downvotes");
    if (!recipe) {
        throw new Error("Recipe not found");
    }
    // Handle upvote logic
    if (voteType === "upvote") {
        const upvotes = recipe.upvotes; // Type assertion to ObjectId[] or undefined
        const hasUpvoted = upvotes
            ? upvotes.some((upvote) => upvote.equals(userObjectId))
            : false; // Check if upvotes exists
        // const hasUpvoted = recipe.upvotes!.some((upvote: mongoose.Types.ObjectId) =>
        //   upvote.equals(userObjectId)
        // );
        if (hasUpvoted) {
            // Remove the upvote
            yield recipe_model_1.Recipe.findByIdAndUpdate(recipeObjectId, { $pull: { upvotes: userObjectId } }, { new: true });
        }
        else {
            // Add upvote and remove any downvote
            yield recipe_model_1.Recipe.findByIdAndUpdate(recipeObjectId, {
                $addToSet: { upvotes: userObjectId },
                $pull: { downvotes: userObjectId },
            }, { new: true });
        }
    }
    // Handle downvote logic
    if (voteType === "downvote") {
        const downvotes = recipe.downvotes;
        const hasDownvoted = downvotes
            ? downvotes.some((downvote) => downvote.equals(userObjectId))
            : false;
        if (hasDownvoted) {
            // Remove the downvote
            yield recipe_model_1.Recipe.findByIdAndUpdate(recipeObjectId, { $pull: { downvotes: userObjectId } }, { new: true });
        }
        else {
            // Add downvote and remove any upvote
            yield recipe_model_1.Recipe.findByIdAndUpdate(recipeObjectId, {
                $addToSet: { downvotes: userObjectId },
                $pull: { upvotes: userObjectId },
            }, { new: true });
        }
    }
    // Return updated upvote/downvote count
    const result = yield recipe_model_1.Recipe.aggregate([
        { $match: { _id: recipeObjectId } },
        {
            $project: {
                upvoteCount: { $size: "$upvotes" },
                downvoteCount: { $size: "$downvotes" },
            },
        },
    ]);
    return result.length > 0 ? result[0] : { upvoteCount: 0, downvoteCount: 0 };
});
exports.ActivityServices = {
    followUserIntoDb,
    toggleVoteRecipe,
    getFollowingStatus: exports.getFollowingStatus,
};
