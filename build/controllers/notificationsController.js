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
const notifications_1 = __importDefault(require("../models/notifications"));
const users_1 = __importDefault(require("../models/users"));
const types_1 = require("../types");
const sequelize_1 = require("sequelize");
const EmailChannel_1 = __importDefault(require("./channels/EmailChannel"));
const PushChannel_1 = __importDefault(require("./channels/PushChannel"));
const SmsChannel_1 = __importDefault(require("./channels/SmsChannel"));
const validations_1 = require("../utils/validations");
class NotificationsController {
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                message: '',
                data: []
            };
            try {
                const notifications = yield notifications_1.default.findAll();
                if (notifications.length > 0) {
                    response.success = true;
                    response.data = notifications;
                    return res.send(response);
                }
                response.message = 'There are not notification entries';
                return res.send(response);
            }
            catch (_error) {
                return res.send(response);
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = {
                success: false,
                message: '',
                data: []
            };
            try {
                let successfulNotifications = 0;
                let failureNotification = 0;
                const category = req.body.category;
                const users = yield users_1.default.findAll({
                    where: {
                        subscribed: {
                            [sequelize_1.Op.like]: `%${category.trim()}%`
                        }
                    }
                });
                if (users.length > 0) {
                    for (const user of users) {
                        const notificationEntry = this.toNewNotificationEntry(req.body, user);
                        if (yield this.send(notificationEntry)) {
                            successfulNotifications++;
                        }
                        else {
                            failureNotification++;
                        }
                    }
                    response.success = true;
                    response.message = `${successfulNotifications} notification were sent successfuly and ${failureNotification} failed`;
                    return res.send(response);
                }
                response.message = `There are not users subscribed to ${category} category`;
                return res.send(response);
            }
            catch (error) {
                response.message = error.message;
                res.send(response);
            }
        });
    }
    send(notification) {
        return __awaiter(this, void 0, void 0, function* () {
            let sender;
            switch (notification.channel) {
                case types_1.Channel.Mail:
                    sender = new EmailChannel_1.default(notification);
                    break;
                case types_1.Channel.Push:
                    sender = new PushChannel_1.default(notification);
                    break;
                case types_1.Channel.Sms:
                    sender = new SmsChannel_1.default(notification);
                    break;
                default:
                    return false;
            }
            return yield sender.send();
        });
    }
    toNewNotificationEntry(object, user) {
        const channel = user.channels.split(',')[0];
        const newNotification = {
            userId: user.id,
            channel: (0, validations_1.parseChannel)(channel),
            category: (0, validations_1.parseCategory)(object.category),
            userName: (0, validations_1.parseName)(user.name),
            message: (0, validations_1.parseMessage)(object.message),
            status: 'sended'
        };
        return newNotification;
    }
}
exports.default = NotificationsController;
