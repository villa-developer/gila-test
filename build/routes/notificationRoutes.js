"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notificationsController_1 = __importDefault(require("../controllers/notificationsController"));
const router = express_1.default.Router();
const notificationController = new notificationsController_1.default();
router.get('/', (req, res) => { void notificationController.index(req, res); });
router.post('/', (req, res) => { void notificationController.store(req, res); });
exports.default = router;
