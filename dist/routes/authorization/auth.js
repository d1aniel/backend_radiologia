"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const auth_controller_1 = require("../../controllers/auth.controller");
class AuthRoutes {
    constructor() {
        this.authController = new auth_controller_1.AuthController();
    }
    routes(app) {
        app.route("/api/register")
            .post(this.authController.register);
        app.route("/api/login")
            .post(this.authController.login);
    }
}
exports.AuthRoutes = AuthRoutes;
//# sourceMappingURL=auth.js.map