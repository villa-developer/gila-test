"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserService = __importStar(require("./../services/userService"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.post('/signin', (req, res) => {
    const response = {
        success: false,
        message: ''
    };
    try {
        const loginRequest = (0, utils_1.toLoginRequest)(req.body);
        const user = UserService.doLogin(loginRequest);
        if (user != null) {
            const successReponse = (0, utils_1.toLoginSuccessResponse)('Success Login', user.subscribed, user.id.toString(), user.name);
            return res.send(successReponse);
        }
        return res.status(400).send(response);
    }
    catch (error) {
        return res.status(400).send(response);
    }
});
exports.default = router;
