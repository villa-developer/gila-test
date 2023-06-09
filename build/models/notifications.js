"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const types_1 = require("../types");
let Notification = class Notification extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Notification.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Notification.prototype, "channel", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Notification.prototype, "category", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Notification.prototype, "userName", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Notification.prototype, "status", void 0);
Notification = __decorate([
    sequelize_typescript_1.Table
], Notification);
exports.default = Notification;
;
