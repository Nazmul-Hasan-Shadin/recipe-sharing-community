import express from "express";
import { RecipeController } from "./recipe.controller";

const router = express.Router();

router.post("/create-recipe", RecipeController.createRecipe);

router.post("/recipe")

export const RecipeRoutes = router;
