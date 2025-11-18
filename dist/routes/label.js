"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LabelRoutes = void 0;
const label_controller_1 = require("../controllers/label.controller");
const auth_1 = require("../middleware/auth");
class LabelRoutes {
    constructor() {
        this.labelController = new label_controller_1.LabelController();
    }
    routes(app) {
        app.route("/api/etiquetas/public")
            .get(this.labelController.getAllLabels)
            .post(this.labelController.createLabel);
        app.route("/api/etiquetas/public/:id")
            .get(this.labelController.getLabelById)
            .patch(this.labelController.updateLabel)
            .delete(this.labelController.deleteLabel);
        app.route("/api/etiquetas/public/:id/logic")
            .delete(this.labelController.deleteLabelAdv);
        app.route("/api/etiquetas")
            .get(auth_1.authMiddleware, this.labelController.getAllLabels)
            .post(auth_1.authMiddleware, this.labelController.createLabel);
        app.route("/api/etiquetas/:id")
            .get(auth_1.authMiddleware, this.labelController.getLabelById)
            .patch(auth_1.authMiddleware, this.labelController.updateLabel)
            .delete(auth_1.authMiddleware, this.labelController.deleteLabel);
        app.route("/api/etiquetas/:id/logic")
            .delete(auth_1.authMiddleware, this.labelController.deleteLabelAdv);
    }
}
exports.LabelRoutes = LabelRoutes;
//# sourceMappingURL=label.js.map