"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doLogin = void 0;
const users_json_1 = __importDefault(require("./users.json"));
const users = users_json_1.default;
const doLogin = (request) => {
    const user = users.find(user => { return user.email === request.email && user.password === request.password; });
    if (user !== null) {
        return user;
    }
    return undefined;
};
exports.doLogin = doLogin;
