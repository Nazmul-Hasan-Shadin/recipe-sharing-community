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
const http_1 = require("http");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const app_1 = __importDefault(require("./app"));
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(config_1.default.db_uri, {
            dbName: "recipe-community",
        });
        console.log("Db is connected");
        server = app_1.default.listen(config_1.default.port, () => {
            console.log("server is running");
        });
    });
}
main();
process.on("unhandledRejection", () => {
    console.log(`unhandle Rejection is detected, shutting down the server`);
    if (http_1.Server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
