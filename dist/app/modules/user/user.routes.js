"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../Auth/auth");
const multer_config_1 = require("../../config/multer.config");
const router = express_1.default.Router();
router.post("/register", multer_config_1.multerUpload.single("profilePicture"), user_controller_1.UserController.createUser);
router.post("/update-profile", (0, auth_1.auth)("user"), user_controller_1.UserController.updateUser);
router.get("/:userId", user_controller_1.UserController.getSingleUser);
exports.UserRoutes = router;
