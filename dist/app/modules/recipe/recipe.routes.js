"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = require("./recipe.controller");
const auth_1 = require("../Auth/auth");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("user"), multer_config_1.multerUpload.array("image"), recipe_controller_1.RecipeController.createRecipe);
router.get("/", recipe_controller_1.RecipeController.getAllRecipe);
router.get("/my-profile", (0, auth_1.auth)("user", "admin"), recipe_controller_1.RecipeController.getMyProfile);
router.get("/:recipeId", recipe_controller_1.RecipeController.getSingleRecipe);
router.patch("/:id", multer_config_1.multerUpload.array("image"), recipe_controller_1.RecipeController.updateRecipe);
router.post("/:id/toggle-publish", recipe_controller_1.RecipeController.toggleRecipePublish);
router.patch("/delete/:recipeId", recipe_controller_1.RecipeController.deleteRecipe);
router.delete("/delete-user-recipe/:recipeId", (0, auth_1.auth)('user', 'admin'), recipe_controller_1.RecipeController.deleteRecipeByUser);
// for comment route
router.post("/:recipeId/comments", (0, auth_1.auth)("user"), recipe_controller_1.RecipeController.createComment);
router.get("/:recipeId/comments", recipe_controller_1.RecipeController.getAllCommentForSpecificRecipe);
router.put("/comments/:commentId", recipe_controller_1.RecipeController.editComment);
router.delete("/:recipeId/comments", (0, auth_1.auth)("user"), recipe_controller_1.RecipeController.deleteComment);
router.patch("/:recipeId/rate", (0, auth_1.auth)("user", "admin"), recipe_controller_1.RecipeController.rateRecipe);
exports.RecipeRoutes = router;
