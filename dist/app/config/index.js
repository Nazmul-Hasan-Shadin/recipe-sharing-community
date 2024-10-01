"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT,
    db_uri: process.env.DB_URI,
    bcrypt_salt: process.env.BCRYPT_SALT,
    jwt_access_token_secret: process.env.JWT_ACCESSTOKEN_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    node_env: process.env.NODE_ENV
};
