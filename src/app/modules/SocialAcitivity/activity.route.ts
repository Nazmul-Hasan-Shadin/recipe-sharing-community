import express from "express";
import { ActivityController } from "./activity.controller";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post("/:id/follow", auth("user",'admin'), ActivityController.followUser);
router.post(
  "/:recipeId/upvote",
  auth("user","admin"),
  ActivityController.upvoteRecipeController
);

router.get(
  "/:id/following-status",
  auth("user", "admin"),
  ActivityController.followingStatus
);

export const ActivityRoutes = router;
