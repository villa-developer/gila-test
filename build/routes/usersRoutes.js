"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersController_1 = __importDefault(require("../controllers/UsersController"));
const loginController_1 = __importDefault(require("../controllers/loginController"));
const router = express_1.default.Router();
const userController = new UsersController_1.default();
const loginController = new loginController_1.default();
router.get('/users', (req, res) => { userController.index(req, res); });
router.post('/signin', (req, res) => { void loginController.signin(req, res); });
exports.default = router;
