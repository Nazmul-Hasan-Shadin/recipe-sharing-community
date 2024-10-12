import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../Auth/auth";
import { multerUpload } from "../../config/multer.config";

const router = express.Router();

router.get("/", UserController.getAllUsers);

router.post(
  "/register",
  multerUpload.single("profilePicture"),
  UserController.createUser
);
router.patch("/update-profile", multerUpload.single("profilePicture"), auth("user",'admin'), UserController.updateUser);

router.get("/:userId", UserController.getSingleUser);
router.patch("/:userId/status", UserController.changeUserStatus);

router.delete("/:userId", UserController.deleteUser);

export const UserRoutes = router;
