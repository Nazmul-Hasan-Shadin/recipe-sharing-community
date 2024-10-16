import { Types } from "mongoose";
import { QueryBuilder } from "../../builder/QueryBuilder";
import { AppError } from "../../errors/AppError";
import { recipeSearchableField } from "./recipe.const";
import { TRecipe } from "./recipe.interface";
import { Comment, Recipe } from "./recipe.model";

const createRecipeIntoDb = async (recipeInfo: TRecipe) => {
  const result = await Recipe.create(recipeInfo);

  return result;
};

const getAllRecipeFromDb = async (query: Record<string, unknown>) => {
  const recipeQuery = new QueryBuilder(Recipe.find().populate("author"), query)
    .search(recipeSearchableField)
    .filter()
    .sort()
    .paginate();

  const result = await recipeQuery.modelQuery;
  return result;
};

const myRecipeFromDb = async (
  userId: string,
  query: Record<string, unknown>
) => {
  const profileQuery = new QueryBuilder(Recipe.find({ author: userId }), query)
    .search(recipeSearchableField)
    .filter()
    .sort()
    .paginate();
  const result = await profileQuery.modelQuery;

  return result;
};

const getSingleRecipeFromDb = async (recipeId: string) => {
  const result = await Recipe.findById(recipeId);

  return result;
};

const updateRecipeInDb = async (recipeId: string, recipeInfo: TRecipe) => {
  const result = await Recipe.findByIdAndUpdate(recipeId, recipeInfo, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteRecipeFromDB = async (recipeId: string, isDeleted: boolean) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    {
      isDeleted,
    }
  );

  return result;
};

const deleteRecipeByUserFromDB = async (recipeId: string) => {
  const result = await Recipe.deleteOne({ _id: recipeId });
  console.log(result, "recipe id");

  return result;
};

const updateRecipePublishStatusIntoDb = async (
  recipeId: string,
  action: string
) => {
  const isPublished = action === "publish";

  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId, isDeleted: false },
    { isPublished, updatedAt: Date.now() },
    { new: true }
  );

  return result; // Returns null if no document was found
};

const addOrUpdateRating = async (
  recipeId: string,
  userId: string,
  ratingValue: number
) => {
  const recipe = await Recipe.findById(recipeId);

  if (!recipe) {
    throw new AppError(404, "Recipe not found");
  }

  // Check if the user has already rated the recipe
  const existingRating = recipe.ratings!.find(
    (rating) => rating.user.toString() === userId.toString()
  );

  if (existingRating) {
    // Update the existing rating

    existingRating.rating = ratingValue;
    console.log(existingRating);
  } else {
    // Add a new rating
    recipe.ratings!.push({
      user: new Types.ObjectId(userId),
      rating: ratingValue,
    });
  }

  // Calculate the average rating
  const totalRatings = recipe.ratings!.reduce(
    (acc, rating) => acc + rating.rating,
    0
  );
  const averageRating = totalRatings / recipe.ratings!.length;

  // Optionally, you can store the average rating directly on the recipe if needed
  recipe.averageRating = averageRating;

  await recipe.save();
  return recipe;
};

//  for comment for  individule a recipe

const createCommentForRecipe = async (comments: {
  userId: string;
  recipeId: string;
  content: string;
}) => {
  const result = await Comment.create(comments);

  return result;
};

const getAllCommentForSpecificRecipe = async (recipeId: string) => {
  const result = await Comment.find({
    recipeId,
  }).populate("userId");

  return result;
};

const deleteCommentFromDB = async (commentId: string) => {
  const result = await Comment.deleteOne({ _id: commentId });

  return result;
};

export const updateComment = async (commentId: string, content: string) => {
  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    { content },
    { new: true, runValidators: true }
  );

  if (!updatedComment) {
    throw new Error("Comment not found."); // Custom error handling
  }

  return updatedComment;
};

export const RecipeServices = {
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
  updateComment,
  deleteRecipeByUserFromDB,
};
