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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityServices = exports.upvoteRecipeIntoDB = void 0;
const AppError_1 = require("../../errors/AppError");
const recipe_model_1 = require("../Recipe/recipe.model");
const user_model_1 = require("../user/user.model");
const followUserIntoDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: currentUserId, targetId } = userInfo;
    console.log(userInfo.id, userInfo.targetId);
    const currentUser = yield user_model_1.User.findById(currentUserId);
    const targetUser = yield user_model_1.User.findById(targetId);
    console.log(currentUser, "iam current user");
    if (!targetUser || !currentUser) {
        throw new AppError_1.AppError(404, "user is not found");
    }
    if (currentUser.following.includes(targetUser._id)) {
        throw new AppError_1.AppError(500, "you already followed");
    }
    currentUser.following.push(targetUser._id);
    yield currentUser.save();
    targetUser.followers.push(currentUser._id);
    yield targetUser.save();
});
const upvoteRecipeIntoDB = (recipeId, _userId) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipe_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.AppError(404, "recipe id is not found");
    }
    // const userObjectId = new Types.ObjectId(userId);
    // const isAlreadyUpvoted = recipe.upvotes.some((id: Types.ObjectId) => id.equals(userObjectId));
    return recipe;
});
exports.upvoteRecipeIntoDB = upvoteRecipeIntoDB;
exports.ActivityServices = {
    followUserIntoDb,
    upvoteRecipeIntoDB: exports.upvoteRecipeIntoDB,
};
