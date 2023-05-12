"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.addNotification = exports.findById = exports.getNotifications = void 0;
const notifications_json_1 = __importDefault(require("./notifications.json"));
const users_json_1 = __importDefault(require("./users.json"));
const notifications = notifications_json_1.default;
const users = users_json_1.default;
const getNotifications = () => notifications;
exports.getNotifications = getNotifications;
const findById = (id) => {
    const notification = notifications.find(notification => notification.id === id);
    if (notification != null) {
        return notification;
    }
    return undefined;
};
exports.findById = findById;
const addNotification = (newNotification) => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const newEntry = Object.assign({ id: Math.max(...notifications.map(d => d.id)) + 1, status: 'sended', created_at: today.toISOString() }, newNotification);
    notifications.push(newEntry);
    return newEntry;
};
exports.addNotification = addNotification;
const getUsers = (category) => {
    const subscribedUsers = users.filter(user => { return user.subscribed.includes(category); });
    return subscribedUsers;
};
exports.getUsers = getUsers;
