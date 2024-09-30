

import express from "express";
import { ActivityController } from "./activity.controller";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post("/:id/follow",auth('user') ,ActivityController.followUser);


export const ActivityRoutes = router;
