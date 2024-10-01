"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongooseErrorHandler_1 = __importDefault(require("../errors/mongooseErrorHandler"));
/* eslint-disable  no-explicit-any */
const globalErrorHandler = (err, req, res, _next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "something went wrong";
    let errorSources = [
        {
            path: "",
            message: "something went wrong",
        },
    ];
    if (err instanceof mongoose_1.default.Error.ValidationError) {
        const simplitfyError = (0, mongooseErrorHandler_1.default)(err);
        message = simplitfyError.message;
        statusCode = simplitfyError.statusCode;
        errorSources = simplitfyError.errorSource;
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
    });
};
exports.default = globalErrorHandler;
