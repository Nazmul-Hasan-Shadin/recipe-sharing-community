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
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../utils/sendResponse"));
const user_services_1 = require("./user.services");
const createUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(req.body, "body and hit");
    console.log(req.body.data);
    console.log(req.file, "Received file");
    console.log(JSON.parse(req.body.data));
    const result = yield user_services_1.UserServices.createUserIntoDb(Object.assign(Object.assign({}, JSON.parse(req.body.data)), { profilePicture: (_a = req.file) === null || _a === void 0 ? void 0 : _a.path }));
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user created succesfull",
        data: result,
    });
}));
const updateUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paylod = req.body;
    const result = yield user_services_1.UserServices.updateProfileIntoDb(req.user, paylod);
    (0, sendResponse_1.default)(res, {
        success: true,
        statusCode: 200,
        message: "user updated succesfull",
        data: result,
    });
}));
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("iam hit");
    console.log(req.params);
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
exports.UserController = {
    createUser,
    updateUser,
    getSingleUser,
};
