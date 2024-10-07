import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../Auth/auth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.post(
  "/register",
  multerUpload.single("profilePicture"),
  UserController.createUser
);
router.post("/update-profile", auth("user"), UserController.updateUser);
router.get("/:userId", UserController.getSingleUser);

export const UserRoutes = router;
