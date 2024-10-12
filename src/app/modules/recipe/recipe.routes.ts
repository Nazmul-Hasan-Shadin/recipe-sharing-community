import express from "express";
import { RecipeController } from "./recipe.controller";
import { auth } from "../Auth/auth";
import { multerUpload } from "../../config/multer.config";
import { AuthController } from "../Auth/auth.controller";

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

router.post("/:id/toggle-publish", RecipeController.toggleRecipePublish);
router.patch("/delete/:recipeId", RecipeController.deleteRecipe);
router.delete("/delete-user-recipe/:recipeId",auth('user','admin') , RecipeController.deleteRecipeByUser);

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

router.put("/comments/:commentId", RecipeController.editComment);

router.delete(
  "/:recipeId/comments",
  auth("user"),
  RecipeController.deleteComment
);

router.patch(
  "/:recipeId/rate",
  auth("user", "admin"),
  RecipeController.rateRecipe
);

export const RecipeRoutes = router;
