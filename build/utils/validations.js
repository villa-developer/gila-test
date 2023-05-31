"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseString = exports.parseMessage = exports.parseName = exports.parseCategory = exports.parseChannel = void 0;
const types_1 = require("../types");
const isString = (string) => {
    return typeof string === 'string';
};
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
exports.parseChannel = parseChannel;
const parseCategory = (categoryFromRequest) => {
    if (!isString(categoryFromRequest) || !isCategory(categoryFromRequest.trim())) {
        throw new Error('Incorrect or misising category');
    }
    return categoryFromRequest;
};
exports.parseCategory = parseCategory;
const parseName = (nameFromRequest) => {
    if (!isString(nameFromRequest)) {
        throw new Error('Incorrect or missing name');
    }
    return nameFromRequest;
};
exports.parseName = parseName;
const parseMessage = (commentFormRequest) => {
    if (!isString(commentFormRequest)) {
        throw new Error('Incorrect or missing message');
    }
    return commentFormRequest;
};
exports.parseMessage = parseMessage;
const parseString = (stringFromRequest, key) => {
    if (!isString(stringFromRequest)) {
        throw new Error(`Incorrect or missing ${key}`);
    }
    return stringFromRequest;
};
exports.parseString = parseString;
