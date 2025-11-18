"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleRoutes = void 0;
const role_controller_1 = require("../../controllers/role.controller");
const auth_1 = require("../../middleware/auth");
class RoleRoutes {
    constructor() {
        this.roleController = new role_controller_1.RoleController();
    }
    routes(app) {
        app.route("/api/roles/public")
            .get(this.roleController.getAllRoles)
            .post(this.roleController.createRole);
        app.route("/api/roles/public/:id")
            .get(this.roleController.getRoleById)
            .patch(this.roleController.updateRole)
            .delete(this.roleController.deleteRole);
        app.route("/api/roles/public/:id/logic")
            .delete(this.roleController.deleteRoleAdv);
        app.route("/api/roles")
            .get(auth_1.authMiddleware, this.roleController.getAllRoles)
            .post(auth_1.authMiddleware, this.roleController.createRole);
        app.route("/api/roles/:id")
            .get(auth_1.authMiddleware, this.roleController.getRoleById)
            .patch(auth_1.authMiddleware, this.roleController.updateRole)
            .delete(auth_1.authMiddleware, this.roleController.deleteRole);
        app.route("/api/roles/:id/logic")
            .delete(auth_1.authMiddleware, this.roleController.deleteRoleAdv);
    }
}
exports.RoleRoutes = RoleRoutes;
//# sourceMappingURL=role.js.map