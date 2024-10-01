"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeRoutes = void 0;
const express_1 = __importDefault(require("express"));
const recipe_controller_1 = require("./recipe.controller");
const router = express_1.default.Router();
router.post("/", recipe_controller_1.RecipeController.createRecipe);
router.get("/", recipe_controller_1.RecipeController.getAllRecipe);
router.get("/:recipeId", recipe_controller_1.RecipeController.getSingleRecipe);
router.delete("/recipeId", recipe_controller_1.RecipeController.deleteRecipe);
// for comment route
router.post("/:recipeId/comments", recipe_controller_1.RecipeController.createComment);
router.get("/:recipeId/comments", recipe_controller_1.RecipeController.getAllCommentForSpecificRecipe);
exports.RecipeRoutes = router;
