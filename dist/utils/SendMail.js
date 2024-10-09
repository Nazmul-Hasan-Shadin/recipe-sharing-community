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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../app/config"));
const sendEmail = (to, html) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config_1.default.node_env === "production", // upgrade later with STARTTLS
        auth: {
            user: "nazmulhasanshadin000@gmail.com",
            pass: process.env.NODE_MAIIL_PASS,
        },
    });
    yield transport.sendMail({
        from: "nazmulhasanshadin000@gmail.com", // sender address
        to, // list of receivers
        subject: "Reset your password ✔", // Subject line
        text: "Hey Legend You are asking for reset password for crucial security. hurry up", // plain text body
        html, // html body
    });
});
exports.sendEmail = sendEmail;
