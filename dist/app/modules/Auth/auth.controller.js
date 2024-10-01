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
exports.AuthController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const config_1 = __importDefault(require("../../config"));
const auth_services_1 = require("./auth.services");
const loginUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = req.body;
    const result = yield auth_services_1.AuthServices.loginUserIntoDb(userInfo);
    const { accessToken, refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.node_env === "production",
        httpOnly: true,
        sameSite: "none",
    });
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user Logged In succesfull",
        data: {
            accessToken,
        },
    });
}));
const changePassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const userData = req.user;
    const result = yield auth_services_1.AuthServices.changePassword(userData, payload);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "password changed succesfull",
        data: result,
    });
}));
exports.AuthController = {
    loginUser,
    changePassword,
};
