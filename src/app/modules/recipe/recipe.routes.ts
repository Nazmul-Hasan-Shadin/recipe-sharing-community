import express from "express";
import { RecipeController } from "./recipe.controller";
import { auth } from "../Auth/auth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  multerUpload.array("image"),
  RecipeController.createRecipe
);

router.get("/", RecipeController.getAllRecipe);
router.get("/my-profile", auth("user", "admin"), RecipeController.getMyProfile);
router.get("/:recipeId", RecipeController.getSingleRecipe);
router.patch(
  "/:id",

  multerUpload.array("image"),
  RecipeController.updateRecipe
);
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
  "/:recipeId/comments",
  auth("user"),
  RecipeController.deleteComment
);

export const RecipeRoutes = router;
