"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("./auth");
const router = express_1.default.Router();
router.post("/login", auth_controller_1.AuthController.loginUser);
router.post("/change-password", (0, auth_1.auth)("user", "admin"), auth_controller_1.AuthController.changePassword);
exports.AuthRoutes = router;
