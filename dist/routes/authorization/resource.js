"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceRoutes = void 0;
const resource_controller_1 = require("../../controllers/resource.controller");
const auth_1 = require("../../middleware/auth");
class ResourceRoutes {
    constructor() {
        this.resourceController = new resource_controller_1.ResourceController();
    }
    routes(app) {
        app.route("/api/resources/public")
            .get(this.resourceController.getAllResources)
            .post(this.resourceController.createResource);
        app.route("/api/resources/public/:id")
            .get(this.resourceController.getResourceById)
            .patch(this.resourceController.updateResource)
            .delete(this.resourceController.deleteResource);
        app.route("/api/resources/public/:id/logic")
            .delete(this.resourceController.deleteResourceAdv);
        app.route("/api/resources")
            .get(auth_1.authMiddleware, this.resourceController.getAllResources)
            .post(auth_1.authMiddleware, this.resourceController.createResource);
        app.route("/api/resources/:id")
            .get(auth_1.authMiddleware, this.resourceController.getResourceById)
            .patch(auth_1.authMiddleware, this.resourceController.updateResource)
            .delete(auth_1.authMiddleware, this.resourceController.deleteResource);
        app.route("/api/resources/:id/logic")
            .delete(auth_1.authMiddleware, this.resourceController.deleteResourceAdv);
    }
}
exports.ResourceRoutes = ResourceRoutes;
//# sourceMappingURL=resource.js.map