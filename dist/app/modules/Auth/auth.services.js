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
exports.AuthServices = void 0;
const SendMail_1 = require("../../../utils/SendMail");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = require("../../errors/AppError");
const user_model_1 = require("../user/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginUserIntoDb = (userInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userInfo;
    const user = yield user_model_1.User.findOne({ email });
    if (!user) {
        throw new AppError_1.AppError(404, "user not found");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.AppError(404, "password donnot match.try again");
    }
    const jwtPayload = {
        email,
        username: user.username,
        userId: user._id,
        role: user.role,
        profilePicture: user === null || user === void 0 ? void 0 : user.profilePicture,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token_secret, {
        expiresIn: "4d",
    });
    const refreshToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token_secret, {
        expiresIn: "30d",
    });
    return {
        accessToken,
        refreshToken,
    };
});
const changePassword = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExist(userData.id);
    if (!user) {
        throw new AppError_1.AppError(404, "user not found");
    }
    const isPasswordCorrect = yield bcrypt_1.default.compare(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordCorrect) {
        throw new AppError_1.AppError(404, "password donnot match.try again");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt));
    console.log(newHashedPassword, "iam hsashed paas");
    const result = yield user_model_1.User.findOneAndUpdate({
        _id: userData.userId,
        role: userData.role,
    }, {
        password: newHashedPassword,
        passwordChangeAt: new Date(),
    });
    return result;
});
const forgetPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExist(id);
    const userStatus = user === null || user === void 0 ? void 0 : user.status;
    if (!user) {
        throw new AppError_1.AppError(404, "This user is not found ");
    }
    if (userStatus === "block") {
        throw new AppError_1.AppError(400, "This user is blocked");
    }
    const jwtPayload = {
        email: user.email,
        username: user.username,
        userId: user._id,
        role: user.role,
    };
    const resetToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_access_token_secret, {
        expiresIn: "6d",
    });
    const resetUILink = `${config_1.default.reset_ui_pass_link}?id=${user._id}&token=${resetToken}`;
    console.log(resetUILink);
    (0, SendMail_1.sendEmail)(user === null || user === void 0 ? void 0 : user.email, resetUILink);
});
const resetPasswordIntoDb = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload.id);
    const user = yield user_model_1.User.isUserExist(payload.id);
    console.log(user);
    if (!user) {
        throw new AppError_1.AppError(404, "This user is not found ");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_token_secret);
    console.log("decoded id", decoded.userId);
    if (payload.id !== decoded.userId) {
        throw new AppError_1.AppError(401, "Your are forbidden");
    }
    const newHashedPassword = yield bcrypt_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt));
    const result = yield user_model_1.User.findOneAndUpdate({
        id: decoded.userId,
        role: decoded.role,
    }, {
        password: newHashedPassword,
        passwordChangeAt: new Date(),
    });
});
exports.AuthServices = {
    loginUserIntoDb,
    changePassword,
    forgetPassword,
    resetPasswordIntoDb,
};
