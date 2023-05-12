"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toLoginSuccessResponse = exports.toLoginRequest = exports.toNewNotificationEntry = void 0;
const types_1 = require("./types");
const isString = (string) => {
    return typeof string === 'string';
};
// const isDate = (date: string): boolean => {
//   return Boolean(Date.parse(date))
// }
const isCategory = (string) => {
    return Object.values(types_1.Category).includes(string);
};
const isChannel = (string) => {
    return Object.values(types_1.Channel).includes(string);
};
const parseChannel = (channelFromRequest) => {
    if (!isString(channelFromRequest) || !isChannel(channelFromRequest)) {
        throw new Error('Incorrect or misising channel');
    }
    return channelFromRequest;
};
const parseCategory = (categoryFromRequest) => {
    if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest)) {
        throw new Error('Incorrect or misising category');
    }
    return categoryFromRequest;
};
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest)) {
        throw new Error('Incorrect or missing name');
    }
    return nameFromRequest;
};
const parseMessage = (commentFormRequest) => {
    if (!isString(commentFormRequest)) {
        throw new Error('Incorrect or missing message');
    }
    return commentFormRequest;
};
const parseString = (stringFromRequest, key) => {
    if (!isString(stringFromRequest)) {
        throw new Error(`Incorrect or missing ${key}`);
    }
    return stringFromRequest;
};
// const parseStatus = (statusFromRequest: any): string => {
//   if (!isString(statusFromRequest)) {
//     throw new Error('Incorrect or missing status')
//   }
//   return statusFromRequest
// }
// const parseCreatedAt = (createdAtFromRequest: any): string => {
//   if (!isString(createdAtFromRequest) || !isDate(createdAtFromRequest)) {
//     throw new Error('Incorrect or missing date')
//   }
//   return createdAtFromRequest
// }
const toNewNotificationEntry = (object, user) => {
    const newNotification = {
        channel: parseChannel(user.channels[0]),
        category: parseCategory(object.category),
        userName: parseName(user.name),
        message: parseMessage(object.message)
    };
    return newNotification;
};
exports.toNewNotificationEntry = toNewNotificationEntry;
const toLoginRequest = (object) => {
    const loginRequest = {
        email: parseString(object.email, 'email'),
        password: parseString(object.password, 'password')
    };
    return loginRequest;
};
exports.toLoginRequest = toLoginRequest;
const toLoginSuccessResponse = (message, categories, token, name) => {
    const response = {
        success: true,
        message,
        categories,
        token,
        name
    };
    return response;
};
exports.toLoginSuccessResponse = toLoginSuccessResponse;
