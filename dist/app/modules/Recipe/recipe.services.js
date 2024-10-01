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
exports.RecipeServices = void 0;
const QueryBuilder_1 = require("../../builder/QueryBuilder");
const recipe_const_1 = require("./recipe.const");
const recipe_model_1 = require("./recipe.model");
const createRecipeIntoDb = (recipeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.create(recipeInfo);
    return result;
});
const getAllRecipeFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const recipeQuery = new QueryBuilder_1.QueryBuilder(recipe_model_1.Recipe.find(), query)
        .search(recipe_const_1.recipeSearchableField)
        .filter()
        .sort()
        .paginate();
    const result = yield recipeQuery.modelQuery;
    return result;
});
const getSingleRecipeFromDb = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findById(recipeId);
    return result;
});
const deleteRecipeFromDB = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Recipe.findOneAndUpdate({ _id: recipeId }, {
        isDeleted: true,
    });
    return result;
});
//  for comment for  individule a recipe
const createCommentForRecipe = (comments) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Comment.create(comments);
    return result;
});
const getAllCommentForSpecificRecipe = (recipeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_model_1.Comment.find({
        recipeId,
    });
    return result;
});
exports.RecipeServices = {
    createRecipeIntoDb,
    getAllRecipeFromDb,
    getSingleRecipeFromDb,
    deleteRecipeFromDB,
    createCommentForRecipe,
    getAllCommentForSpecificRecipe,
};
