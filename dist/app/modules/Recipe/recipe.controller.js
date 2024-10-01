"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const recipe_services_1 = require("./recipe.services");
const createRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const result = yield recipe_services_1.RecipeServices.createRecipeIntoDb(userInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe created succesfull",
        data: result,
    });
}));
const getAllRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_services_1.RecipeServices.getAllRecipeFromDb(req.query);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe are retrived succesfull",
        data: result,
    });
}));
const getSingleRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_services_1.RecipeServices.getSingleRecipeFromDb(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe retrived succesfull",
        data: result,
    });
}));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_services_1.RecipeServices.deleteRecipeFromDB(req.params.id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe deleted succesfull",
        data: result,
    });
}));
const createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    console.log(userId, "iamuserid");
    const recipeId = req.params.recipeId;
    const payloadComment = {
        userId,
        recipeId,
        comment: req.body,
    };
    const result = yield recipe_services_1.RecipeServices.createCommentForRecipe(payloadComment);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Comment succesfull",
        data: result,
    });
}));
const getAllCommentForSpecificRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.recipeId;
    const result = yield recipe_services_1.RecipeServices.getAllCommentForSpecificRecipe(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "",
        data: result,
    });
}));
// const updateUser = catchAsync(async (req, res) => {
//   const paylod = req.body;
//   const result = await UserServices.updateProfileIntoDb(req.user, paylod);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "user updated succesfull",
//     data: result,
//   });
// });
exports.RecipeController = {
    createRecipe,
    getAllRecipe,
    getSingleRecipe,
    deleteRecipe,
    createComment,
    getAllCommentForSpecificRecipe,
};
