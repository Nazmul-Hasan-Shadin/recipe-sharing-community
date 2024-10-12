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
exports.ActivityController = exports.upvoteRecipeController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const activity_services_1 = require("./activity.services");
const followUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = {
        id: req.user.userId,
        targetId: req.params.id,
    };
    const result = yield activity_services_1.ActivityServices.followUserIntoDb(userInfo);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "Followed",
        data: result,
    });
}));
const followingStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const currentUserId = req.user.userId;
    const result = yield activity_services_1.ActivityServices.getFollowingStatus(currentUserId, userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "following status",
        data: result,
    });
}));
exports.upvoteRecipeController = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId: optionalid, type } = req.body;
    const { recipeId } = req.params;
    const userId = req.user.userId;
    const upvoteCount = yield activity_services_1.ActivityServices.toggleVoteRecipe(recipeId, userId, type);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "upvote succesful",
        data: upvoteCount,
    });
}));
exports.ActivityController = {
    followUser,
    upvoteRecipeController: exports.upvoteRecipeController,
    followingStatus,
};
