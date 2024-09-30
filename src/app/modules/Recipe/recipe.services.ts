import { TRecipe } from "./recipe.interface";
import { Recipe } from "./recipe.model";

const createRecipeIntoDb = async (recipeInfo: TRecipe) => {
  const result = await Recipe.create(recipeInfo);

  return result;
};

export const RecipeServices = {
  createRecipeIntoDb,
};
