import express from "express";
import { RecipeController } from "./recipe.controller";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post("/", auth("user"), RecipeController.createRecipe);

router.get("/", RecipeController.getAllRecipe);
router.get("/:recipeId", RecipeController.getSingleRecipe);
router.delete("/recipeId", RecipeController.deleteRecipe);

// for comment route

router.post(
  "/:recipeId/comments",
  auth("user"),
  RecipeController.createComment
);
router.get(
  "/:recipeId/comments",
  RecipeController.getAllCommentForSpecificRecipe
);
router.post(
  "/:recipeId/comments/:userId",
  auth("user"),
  RecipeController.deleteComment
);

export const RecipeRoutes = router;
