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
router.patch(
  "/reset-password",

  AuthController.resetPassword
);

router.post("/forget-password", AuthController.forgetPassword);

export const AuthRoutes = router;
