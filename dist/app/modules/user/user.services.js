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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = exports.changeUserStatusInDb = void 0;
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("./user.model");
const createUserIntoDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userInfo);
    return result;
});
const updateProfileIntoDb = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userInfo);
    const { userId } = userInfo;
    const user = yield user_model_1.User.findById(userInfo.userId);
    const result = yield user_model_1.User.findByIdAndUpdate(userInfo.userId, {
        username: payload === null || payload === void 0 ? void 0 : payload.name,
        profilePicture: payload === null || payload === void 0 ? void 0 : payload.profilePicture,
        bio: payload === null || payload === void 0 ? void 0 : payload.bio,
    }, {
        new: true,
    });
    return result;
});
const getSingleUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findById(userId);
    return result;
});
const getAllUsersFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find();
    return result;
});
const deleteUserFromDb = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if the user exists
    const user = yield user_model_1.User.findById(userId);
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    // Delete the user using deleteOne
    const result = yield user_model_1.User.deleteOne({ _id: userId });
    return result;
});
const getSingleUserByEmailFromDb = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({
        email: email,
    });
    return result;
});
const changeUserStatusInDb = (userId, status) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(userId, status, "User ID and status");
    // Find the user and update their status
    const user = yield user_model_1.User.findByIdAndUpdate(userId, { status }, { new: true, runValidators: true });
    if (!user) {
        throw new AppError_1.AppError(404, "User not found");
    }
    return { message: "User status updated successfully", user };
});
exports.changeUserStatusInDb = changeUserStatusInDb;
exports.UserServices = {
    createUserIntoDb,
    updateProfileIntoDb,
    getSingleUserFromDb,
    getSingleUserByEmailFromDb,
    getAllUsersFromDb,
    deleteUserFromDb,
    changeUserStatusInDb: exports.changeUserStatusInDb,
};
