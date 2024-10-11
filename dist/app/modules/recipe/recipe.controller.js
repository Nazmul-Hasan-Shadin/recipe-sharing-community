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
    var _a;
    const allCookingdata = JSON.parse(req.body.data);
    const files = req.files;
    // Use the correct type for the file parameter in the map function
    const image = files.map((file) => file.path);
    const userInformation = {
        name: req.user.username,
        author: req.user.userId,
        profilePicture: (_a = req.user) === null || _a === void 0 ? void 0 : _a.profilePicture,
    };
    console.log(req.user, "iam user");
    const recipeData = Object.assign(Object.assign(Object.assign({}, allCookingdata), userInformation), { image });
    const result = yield recipe_services_1.RecipeServices.createRecipeIntoDb(recipeData);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe created succesfull",
        data: result,
    });
}));
const getMyProfile = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield recipe_services_1.RecipeServices.myRecipeFromDb(req.user.userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe are retrived succesfull",
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
    const result = yield recipe_services_1.RecipeServices.getSingleRecipeFromDb(req.params.recipeId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe retrived succesfull",
        data: result,
    });
}));
const updateRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.files);
    console.log("iam hit");
    console.log(req.params.id);
    const recipeId = req.params.id;
    const recipeInfo = JSON.parse(req.body.data);
    // Explicitly cast req.files as an array of Express.Multer.File
    const files = req.files;
    // Extract the path from each file in the array
    const filePaths = files.map((file) => file.path);
    recipeInfo.path = filePaths;
    const result = yield recipe_services_1.RecipeServices.updateRecipeInDb(recipeId, recipeInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe updated succesfull",
        data: result,
    });
}));
const deleteRecipe = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { isDeleted } = req.body;
    console.log(req.body, "delte logl", req.params.recipeId);
    const result = yield recipe_services_1.RecipeServices.deleteRecipeFromDB(req.params.recipeId, isDeleted);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Recipe deleted successfully",
        data: result,
    });
}));
const toggleRecipePublish = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { action } = req.body;
    console.log(action, "bdoy aciton");
    console.log(req.params.id, "loio i");
    const recipe = yield recipe_services_1.RecipeServices.updateRecipePublishStatusIntoDb(req.params.id, action);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: action === "publish"
            ? "Recipe published successfully"
            : "Recipe unpublished successfully",
        data: recipe,
    });
}));
// =============comment api service ==============
const createComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const recipeId = req.params.recipeId;
    const payloadComment = {
        userId,
        recipeId,
        content: req.body.content,
    };
    console.log(payloadComment, "iam hit");
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
    console.log(id, "recipe id for comment");
    const result = yield recipe_services_1.RecipeServices.getAllCommentForSpecificRecipe(id);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "all comment retrived succestful",
        data: result,
    });
}));
const deleteComment = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user.userId;
    const result = yield recipe_services_1.RecipeServices.deleteCommentFromDB(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Comment deleted succesfull",
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
    deleteComment,
    getMyProfile,
    updateRecipe,
    toggleRecipePublish,
};
