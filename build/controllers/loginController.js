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
const users_1 = __importDefault(require("../models/users"));
const validations_1 = require("../utils/validations");
class LoginController {
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                message: '',
                data: []
            };
            try {
                const loginRequest = this.toLoginRequest(req.body);
                const user = yield users_1.default.findOne({ where: loginRequest });
                if (user != null) {
                    const categoties = user.subscribed.split(',');
                    const data = {
                        name: user.name,
                        token: user.id,
                        categories: categoties
                    };
                    response.success = true;
                    response.data.push(data);
                    return res.send(response);
                }
                response.message = 'Invalid email or password';
                return res.status(400).send(response);
            }
            catch (error) {
                response.message = error.message;
                return res.status(400).send(response);
            }
        });
    }
    toLoginRequest(object) {
        const loginRequest = {
            email: (0, validations_1.parseString)(object.email, 'email'),
            password: (0, validations_1.parseString)(object.password, 'password')
        };
        return loginRequest;
    }
}
exports.default = LoginController;
