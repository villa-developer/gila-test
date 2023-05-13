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
const axios_1 = __importDefault(require("axios"));
const globals_1 = require("@jest/globals");
const url = 'http://127.0.0.1:3000/api/notifications';
const authUrl = 'http://127.0.0.1:3000/api/auth';
// `
(0, globals_1.describe)('Test notification routes', () => {
    const defaultNotification = {
        id: 1,
        channel: 'sms',
        category: 'finance',
        userName: 'User One',
        message: 'Bla bla bla',
        status: 'SENDED',
        created_at: '2023-05-11 12:20'
    };
    (0, globals_1.test)('Get notifications', () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios_1.default.get(url);
        const data = res.data;
        (0, globals_1.expect)(res.status).toBe(200);
        (0, globals_1.expect)(data.length).toBeGreaterThan(0);
        (0, globals_1.expect)(data[0]).toEqual(defaultNotification);
    }));
    (0, globals_1.test)('Create notification', () => __awaiter(void 0, void 0, void 0, function* () {
        const notification = {
            category: 'finance',
            message: 'Bla bla bla'
        };
        const res = yield axios_1.default.post(url, notification);
        (0, globals_1.expect)(res.status).toBe(200);
    }));
});
(0, globals_1.describe)('Test authentication routes', () => {
    (0, globals_1.test)('Get notifications', () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRequest = {
            email: 'ing.carlosagaton',
            password: 'password'
        };
        const res = yield axios_1.default.post(authUrl + '/signin', loginRequest);
        (0, globals_1.expect)(res.status).toBe(400);
    }));
    (0, globals_1.test)('Create notification', () => __awaiter(void 0, void 0, void 0, function* () {
        const notification = {
            category: 'finance',
            message: 'Bla bla bla'
        };
        const res = yield axios_1.default.post(url, notification);
        (0, globals_1.expect)(res.status).toBe(200);
    }));
});
