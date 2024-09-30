import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.routes";
import { ActivityRoutes } from "../modules/SocialAcitivity/activity.route";
import { RecipeRoutes } from "../modules/Recipe/recipe.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/user",
    route: AuthRoutes,
  },
  
  {
    path: "/user",
    route: ActivityRoutes,
  },
  
  {
    path: "/recipe",
    route: RecipeRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
