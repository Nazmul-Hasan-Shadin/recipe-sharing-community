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
exports.RecipeServices = exports.updateComment = void 0;
const mongoose_1 = require("mongoose");
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const AppError_1 = require("../../errors/AppError");
const recipe_const_1 = require("./recipe.const");
const recipe_model_1 = require("./recipe.model");
const createRecipeIntoDb = (recipeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.create(recipeInfo);
    return result;
});
const getAllRecipeFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeQuery = new QueryBuilder_1.QueryBuilder(recipe_model_1.Recipe.find().populate("author"), query)
        .search(recipe_const_1.recipeSearchableField)
        .filter()
        .sort()
        .paginate();
    const result = yield recipeQuery.modelQuery;
    return result;
});
const myRecipeFromDb = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const profileQuery = new QueryBuilder_1.QueryBuilder(recipe_model_1.Recipe.find({ author: userId }), query)
        .search(recipe_const_1.recipeSearchableField)
        .filter()
        .sort()
        .paginate();
    const result = yield profileQuery.modelQuery;
    return result;
});
const getSingleRecipeFromDb = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findById(recipeId);
    return result;
});
const updateRecipeInDb = (recipeId, recipeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findByIdAndUpdate(recipeId, recipeInfo, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteRecipeFromDB = (recipeId, isDeleted) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findOneAndUpdate({ _id: recipeId }, {
        isDeleted,
    });
    return result;
});
const deleteRecipeByUserFromDB = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.deleteOne({ _id: recipeId });
    console.log(result, "recipe id");
    return result;
});
const updateRecipePublishStatusIntoDb = (recipeId, action) => __awaiter(void 0, void 0, void 0, function* () {
    const isPublished = action === "publish";
    const result = yield recipe_model_1.Recipe.findOneAndUpdate({ _id: recipeId, isDeleted: false }, { isPublished, updatedAt: Date.now() }, { new: true });
    return result; // Returns null if no document was found
});
const addOrUpdateRating = (recipeId, userId, ratingValue) => __awaiter(void 0, void 0, void 0, function* () {
    const recipe = yield recipe_model_1.Recipe.findById(recipeId);
    if (!recipe) {
        throw new AppError_1.AppError(404, "Recipe not found");
    }
    // Check if the user has already rated the recipe
    const existingRating = recipe.ratings.find((rating) => rating.user.toString() === userId.toString());
    if (existingRating) {
        // Update the existing rating
        existingRating.rating = ratingValue;
        console.log(existingRating);
    }
    else {
        // Add a new rating
        recipe.ratings.push({
            user: new mongoose_1.Types.ObjectId(userId),
            rating: ratingValue,
        });
    }
    // Calculate the average rating
    const totalRatings = recipe.ratings.reduce((acc, rating) => acc + rating.rating, 0);
    const averageRating = totalRatings / recipe.ratings.length;
    // Optionally, you can store the average rating directly on the recipe if needed
    recipe.averageRating = averageRating;
    yield recipe.save();
    return recipe;
});
//  for comment for  individule a recipe
const createCommentForRecipe = (comments) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Comment.create(comments);
    return result;
});
const getAllCommentForSpecificRecipe = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Comment.find({
        recipeId,
    }).populate("userId");
    return result;
});
const deleteCommentFromDB = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Comment.deleteOne({ _id: commentId });
    return result;
});
const updateComment = (commentId, content) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedComment = yield recipe_model_1.Comment.findByIdAndUpdate(commentId, { content }, { new: true, runValidators: true });
    if (!updatedComment) {
        throw new Error("Comment not found."); // Custom error handling
    }
    return updatedComment;
});
exports.updateComment = updateComment;
exports.RecipeServices = {
    createRecipeIntoDb,
    getAllRecipeFromDb,
    getSingleRecipeFromDb,
    deleteRecipeFromDB,
    createCommentForRecipe,
    getAllCommentForSpecificRecipe,
    deleteCommentFromDB,
    myRecipeFromDb,
    updateRecipeInDb,
    updateRecipePublishStatusIntoDb,
    addOrUpdateRating,
    updateComment: exports.updateComment,
    deleteRecipeByUserFromDB,
};
