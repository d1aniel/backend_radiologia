"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologistRoutes = void 0;
const technologist_controller_1 = require("../controllers/technologist.controller");
const auth_1 = require("../middleware/auth");
class TechnologistRoutes {
    constructor() {
        this.technologistController = new technologist_controller_1.TechnologistController();
    }
    routes(app) {
        app.route("/api/tecnologos/public")
            .get(this.technologistController.getAllTechnologists)
            .post(this.technologistController.createTechnologist);
        app.route("/api/tecnologos/public/:id")
            .get(this.technologistController.getTechnologistById)
            .patch(this.technologistController.updateTechnologist)
            .delete(this.technologistController.deleteTechnologist);
        app.route("/api/tecnologos/public/:id/logic")
            .delete(this.technologistController.deleteTechnologistAdv);
        app.route("/api/tecnologos")
            .get(auth_1.authMiddleware, this.technologistController.getAllTechnologists)
            .post(auth_1.authMiddleware, this.technologistController.createTechnologist);
        app.route("/api/tecnologos/:id")
            .get(auth_1.authMiddleware, this.technologistController.getTechnologistById)
            .patch(auth_1.authMiddleware, this.technologistController.updateTechnologist)
            .delete(auth_1.authMiddleware, this.technologistController.deleteTechnologist);
        app.route("/api/tecnologos/:id/logic")
            .delete(auth_1.authMiddleware, this.technologistController.deleteTechnologistAdv);
    }
}
exports.TechnologistRoutes = TechnologistRoutes;
//# sourceMappingURL=technologist.js.map