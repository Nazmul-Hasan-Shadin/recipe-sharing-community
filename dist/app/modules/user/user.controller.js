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
exports.UserController = exports.getAllUsers = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const result = yield user_services_1.UserServices.createUserIntoDb(Object.assign(Object.assign({}, JSON.parse(req.body.data)), { profilePicture: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user created succesfull",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const paylod = req.body;
    const data = Object.assign(Object.assign({}, JSON.parse(req.body.data)), { profilePicture: (_b = req.file) === null || _b === void 0 ? void 0 : _b.path });
    console.log(paylod, 'udpate user');
    console.log(req.file, 'iam file');
    const result = yield user_services_1.UserServices.updateProfileIntoDb(req.user, data);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user updated succesfull",
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const result = yield user_services_1.UserServices.getSingleUserFromDb(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user retrived succesfull",
        data: result,
    });
}));
// const getSingleUser = catchAsync(async (req, res) => {
//   console.log("iam hit");
//   console.log(req.params);
//   const userId = req.params.userId;
//   const result = await UserServices.getSingleUserFromDb(userId);
//   sendResponse(res, {
//     success: true,
//     statusCode: 200,
//     message: "user retrived succesfull",
//     data: result,
//   });
// });
exports.getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_services_1.UserServices.getAllUsersFromDb();
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user retrived succesfull",
        data: result,
    });
}));
const deleteUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const result = yield user_services_1.UserServices.deleteUserFromDb(userId);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User deleted successful",
        data: result,
    });
}));
const changeUserStatus = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.userId);
    const { status } = req.body;
    // Call the service function to update the user's status
    const result = yield user_services_1.UserServices.changeUserStatusInDb(req.params.userId, status);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "User status updated successfully",
        data: result.user,
    });
}));
exports.UserController = {
    createUser,
    updateUser,
    getSingleUser,
    getAllUsers: exports.getAllUsers,
    deleteUser,
    changeUserStatus,
};
