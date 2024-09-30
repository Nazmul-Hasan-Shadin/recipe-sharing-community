import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../Auth/auth";

const router = express.Router();

router.post("/register", UserController.createUser);
router.post("/update-profile", auth("user"), UserController.updateUser);

export const UserRoutes = router;
