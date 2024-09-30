import express from "express";
import { AuthController } from "./auth.controller";
import { auth } from "./auth";

const router = express.Router();

router.post("/login", AuthController.loginUser);

router.post(
  "/change-password",
  auth("user", "admin"),
  AuthController.changePassword
);

export const AuthRoutes = router;
