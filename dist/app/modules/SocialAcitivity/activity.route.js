"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const activity_controller_1 = require("./activity.controller");
const auth_1 = require("../Auth/auth");
const router = express_1.default.Router();
router.post("/:id/follow", (0, auth_1.auth)("user", 'admin'), activity_controller_1.ActivityController.followUser);
router.post("/:recipeId/upvote", (0, auth_1.auth)("user", "admin"), activity_controller_1.ActivityController.upvoteRecipeController);
router.get("/:id/following-status", (0, auth_1.auth)("user", "admin"), activity_controller_1.ActivityController.followingStatus);
exports.ActivityRoutes = router;
