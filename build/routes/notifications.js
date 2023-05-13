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
const notificationService = __importStar(require("./../services/notificationServices"));
const utils_1 = require("../utils");
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(notificationService.getNotifications());
});
router.get('/:id', (req, res) => {
    res.send(notificationService.findById(+req.params.id));
});
router.post('/', (req, res) => {
    const response = {
        success: false,
        message: ''
    };
    try {
        const users = notificationService.getUsers(req.body.category);
        if (users.length > 0) {
            let notificationsSended = 0;
            users.forEach(user => {
                const newNotification = (0, utils_1.toNewNotificationEntry)(req.body, user);
                notificationService.addNotification(newNotification);
                notificationsSended++;
            });
            response.success = true;
            response.message = `${notificationsSended} notification sended`;
            return res.send(response);
        }
        response.message = 'There are no users subscribed to the specified category';
        return res.send(response);
    }
    catch (e) {
        response.message = e.message;
        return res.status(400).send(response);
    }
});
exports.default = router;
