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
const users_json_1 = __importDefault(require("./../mock/users.json"));
class UserController {
    constructor() {
        this.users = [];
        this.users = users_json_1.default;
    }
    index(_req, res) {
        res.send(this.users);
    }
    createUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield users_1.default.findAll();
                if (users.length === 0) {
                    yield users_1.default.bulkCreate(users_json_1.default);
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.default = UserController;
