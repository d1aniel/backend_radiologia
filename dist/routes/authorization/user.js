"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const user_controller_1 = require("../../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.userController = new user_controller_1.UserController();
    }
    routes(app) {
        app.route("/api/users").get(this.userController.getAllUsers);
        app.route("/api/users").post(this.userController.getAllUsers);
    }
}
exports.UserRoutes = UserRoutes;
//# sourceMappingURL=user.js.map