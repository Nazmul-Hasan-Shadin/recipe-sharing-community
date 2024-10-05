import { QueryBuilder } from "../../builder/QueryBuilder";
import { recipeSearchableField } from "./recipe.const";
import { TRecipe } from "./recipe.interface";
import { Comment, Recipe } from "./recipe.model";

const createRecipeIntoDb = async (recipeInfo: TRecipe, userName: string) => {
  recipeInfo.name = userName;
  const result = await Recipe.create(recipeInfo);

  return result;
};

const getAllRecipeFromDb = async (query: Record<string, unknown>) => {
  const recipeQuery = new QueryBuilder(Recipe.find(), query)
    .search(recipeSearchableField)
    .filter()
    .sort()
    .paginate();

  const result = await recipeQuery.modelQuery;
  return result;
};

const getSingleRecipeFromDb = async (recipeId: string) => {
  console.log(recipeId, "insride reecipve services");

  const result = await Recipe.findById(recipeId);

  return result;
};

const deleteRecipeFromDB = async (recipeId: string) => {
  const result = await Recipe.findOneAndUpdate(
    { _id: recipeId },
    {
      isDeleted: true,
    }
  );

  return result;
};

//  for comment for  individule a recipe

const createCommentForRecipe = async (comments: {
  userId: string;
  recipeId: string;
  content: string;
}) => {
  console.log(comments, "iam comments");
  const result = await Comment.create(comments);

  return result;
};

const getAllCommentForSpecificRecipe = async (recipeId: string) => {
  const result = await Comment.find({
    recipeId,
  }).populate("userId");

  console.log(result, "iam result");

  return result;
};

const deleteCommentFromDB = async (recipeId: string) => {
  const result = await Comment.deleteOne({ recipeId: recipeId });

  return result;
};

export const RecipeServices = {
  createRecipeIntoDb,
  getAllRecipeFromDb,
  getSingleRecipeFromDb,
  deleteRecipeFromDB,
  createCommentForRecipe,
  getAllCommentForSpecificRecipe,
  deleteCommentFromDB,
};
