"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseErrorHandler = (err) => {
    const errorSource = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: "mongoose validation error",
        errorSource,
    };
};
exports.default = mongooseErrorHandler;
