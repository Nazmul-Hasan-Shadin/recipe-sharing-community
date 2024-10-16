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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../config"));
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    password: {
        type: String,
        required: true,
    },
    isPremium: {
        type: Boolean,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    bio: {
        Type: String,
    },
    followers: [
        {
            type: mongoose_1.Schema.ObjectId,
            ref: "User",
        },
    ],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    status: {
        type: String,
        enum: ["active", "block"],
        default: "active",
    },
    passwordChangeAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_salt));
        next();
    });
});
userSchema.post("save", function (doc, next) {
    doc.password = "";
    next();
});
//  check is user exist
userSchema.statics.isUserExist = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ _id: id }).select("+password");
    });
};
userSchema.virtual("totalFollowers").get(function () {
    return `${this.followers.length}`;
});
exports.User = (0, mongoose_1.model)("User", userSchema);
