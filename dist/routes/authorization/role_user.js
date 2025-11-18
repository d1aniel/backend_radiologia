"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleUserRoutes = void 0;
const role_user_controller_1 = require("../../controllers/role_user.controller");
const auth_1 = require("../../middleware/auth");
class RoleUserRoutes {
    constructor() {
        this.roleUserController = new role_user_controller_1.RoleUserController();
    }
    routes(app) {
        app.route("/api/roleUsers/public")
            .get(this.roleUserController.getAllRoleUsers)
            .post(this.roleUserController.createRoleUser);
        app.route("/api/roleUsers/public/:id")
            .get(this.roleUserController.getRoleUserById)
            .patch(this.roleUserController.updateRoleUser)
            .delete(this.roleUserController.deleteRoleUser);
        app.route("/api/roleUsers/public/:id/logic")
            .delete(this.roleUserController.deleteRoleUserAdv);
        app.route("/api/roleUsers")
            .get(auth_1.authMiddleware, this.roleUserController.getAllRoleUsers)
            .post(auth_1.authMiddleware, this.roleUserController.createRoleUser);
        app.route("/api/roleUsers/:id")
            .get(auth_1.authMiddleware, this.roleUserController.getRoleUserById)
            .patch(auth_1.authMiddleware, this.roleUserController.updateRoleUser)
            .delete(auth_1.authMiddleware, this.roleUserController.deleteRoleUser);
        app.route("/api/roleUsers/:id/logic")
            .delete(auth_1.authMiddleware, this.roleUserController.deleteRoleUserAdv);
    }
}
exports.RoleUserRoutes = RoleUserRoutes;
//# sourceMappingURL=role_user.js.map