import { QueryBuilder } from "../../builder/QueryBuilder";
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

const myRecipeFromDb = async (userId: string) => {
  const result = await Recipe.find({ author: userId });

  return result;
};

const getSingleRecipeFromDb = async (recipeId: string) => {
  console.log(recipeId, "insride reecipve services");

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
  myRecipeFromDb,
  updateRecipeInDb,
  updateRecipePublishStatusIntoDb,
};
