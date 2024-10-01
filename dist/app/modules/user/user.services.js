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
exports.UserServices = void 0;
const user_model_1 = require("./user.model");
const createUserIntoDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.create(userInfo);
    return result;
});
const updateProfileIntoDb = (userInfo, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = userInfo;
    console.log(userInfo, "iam info");
    const user = yield user_model_1.User.findById(userInfo);
    console.log(user, "iam user");
    const result = yield user_model_1.User.findByIdAndUpdate(userId, {
        name: payload === null || payload === void 0 ? void 0 : payload.name,
        profilePicture: payload === null || payload === void 0 ? void 0 : payload.profilePicture,
        bio: payload === null || payload === void 0 ? void 0 : payload.bio,
    }, {
        new: true,
    });
    return result;
});
exports.UserServices = {
    createUserIntoDb,
    updateProfileIntoDb,
};
