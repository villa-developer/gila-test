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
const notifications_1 = __importDefault(require("../../models/notifications"));
const types_1 = require("../../types");
const Sender_1 = __importDefault(require("./Sender"));
class PushChannel extends Sender_1.default {
    constructor(notification) {
        super(notification);
        this.name = types_1.Channel.Push;
    }
    send() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newNotification = yield notifications_1.default.create(this.notification);
                if (newNotification instanceof notifications_1.default) {
                    return true;
                }
                return false;
            }
            catch (_error) {
                return false;
            }
        });
    }
}
exports.default = PushChannel;
