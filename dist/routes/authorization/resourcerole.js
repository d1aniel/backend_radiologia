"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoleRoutes = void 0;
const resourceRole_controller_1 = require("../../controllers/resourceRole.controller");
const auth_1 = require("../../middleware/auth");
class ResourceRoleRoutes {
    constructor() {
        this.resourceRoleController = new resourceRole_controller_1.ResourceRoleController();
    }
    routes(app) {
        app.route("/api/resourceRoles/public")
            .get(this.resourceRoleController.getAllResourceRoles)
            .post(this.resourceRoleController.createResourceRole);
        app.route("/api/resourceRoles/public/:id")
            .get(this.resourceRoleController.getResourceRoleById)
            .patch(this.resourceRoleController.updateResourceRole)
            .delete(this.resourceRoleController.deleteResourceRole);
        app.route("/api/resourceRoles/public/:id/logic")
            .delete(this.resourceRoleController.deleteResourceRoleAdv);
        app.route("/api/resourceRoles")
            .get(auth_1.authMiddleware, this.resourceRoleController.getAllResourceRoles)
            .post(auth_1.authMiddleware, this.resourceRoleController.createResourceRole);
        app.route("/api/resourceRoles/:id")
            .get(auth_1.authMiddleware, this.resourceRoleController.getResourceRoleById)
            .patch(auth_1.authMiddleware, this.resourceRoleController.updateResourceRole)
            .delete(auth_1.authMiddleware, this.resourceRoleController.deleteResourceRole);
        app.route("/api/resourceRoles/:id/logic")
            .delete(auth_1.authMiddleware, this.resourceRoleController.deleteResourceRoleAdv);
    }
}
exports.ResourceRoleRoutes = ResourceRoleRoutes;
//# sourceMappingURL=resourcerole.js.map