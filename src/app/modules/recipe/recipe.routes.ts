import express from "express";
import { RecipeController } from "./recipe.controller";

const router = express.Router();

router.post("/", RecipeController.createRecipe);

router.get("/", RecipeController.getAllRecipe);
router.get("/:recipeId", RecipeController.getSingleRecipe);
router.delete("/recipeId", RecipeController.deleteRecipe);

// for comment route

router.post("/:recipeId/comments", RecipeController.createComment);
router.get(
  "/:recipeId/comments",
  RecipeController.getAllCommentForSpecificRecipe
);

export const RecipeRoutes = router;
