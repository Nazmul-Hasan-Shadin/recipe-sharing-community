import express from "express";
import { ActivityController } from "./activity.controller";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post("/:id/follow", auth("user"), ActivityController.followUser);
router.post(
  "/:recipeId/upvote",
  auth("user"),
  ActivityController.upvoteRecipeController
);

export const ActivityRoutes = router;
