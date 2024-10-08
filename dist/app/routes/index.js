"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/Auth/auth.routes");
const activity_route_1 = require("../modules/SocialAcitivity/activity.route");
const recipe_routes_1 = require("../modules/recipe/recipe.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/user",
        route: user_routes_1.UserRoutes,
    },
    {
        path: "/user",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/user",
        route: activity_route_1.ActivityRoutes,
    },
    {
        path: "/recipe",
        route: recipe_routes_1.RecipeRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
