"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const notificationRoutes_1 = __importDefault(require("./routes/notificationRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
const database_1 = __importDefault(require("./database/database"));
const users_1 = __importDefault(require("./models/users"));
const UsersController_1 = __importDefault(require("./controllers/UsersController"));
const notifications_1 = __importDefault(require("./models/notifications"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*'
}));
app.use(express_1.default.json());
const PORT = 3000;
const userController = new UsersController_1.default();
void database_1.default.sync().then(() => { void userController.createUsers(); });
database_1.default.addModels([users_1.default, notifications_1.default]);
app.use('/api/notifications', notificationRoutes_1.default);
app.use('/api/auth', usersRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
