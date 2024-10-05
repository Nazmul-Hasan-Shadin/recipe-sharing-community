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
router.post(
  "/reset-passwor",
  auth("user", "admin"),
  AuthController.resetPassword
);

router.post('/forget-password',auth('user'),AuthController.forgetPassword)

export const AuthRoutes = router;
