"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalidadRoutes = void 0;
const modalitie_controller_1 = require("../controllers/modalitie.controller");
const auth_1 = require("../middleware/auth");
class ModalidadRoutes {
    constructor() {
        this.modalidadController = new modalitie_controller_1.ModalidadController();
    }
    routes(app) {
        app
            .route("/api/modalidades/public")
            .get(this.modalidadController.getAllModalidades)
            .post(this.modalidadController.createModalidad);
        app
            .route("/api/modalidades/public/:id")
            .get(this.modalidadController.getModalidadById)
            .patch(this.modalidadController.updateModalidad)
            .delete(this.modalidadController.deleteModalidad);
        app
            .route("/api/modalidades/public/:id/logic")
            .delete(this.modalidadController.deleteModalidadAdv);
        app
            .route("/api/modalidades")
            .get(auth_1.authMiddleware, this.modalidadController.getAllModalidades)
            .post(auth_1.authMiddleware, this.modalidadController.createModalidad);
        app
            .route("/api/modalidades/:id")
            .get(auth_1.authMiddleware, this.modalidadController.getModalidadById)
            .patch(auth_1.authMiddleware, this.modalidadController.updateModalidad)
            .delete(auth_1.authMiddleware, this.modalidadController.deleteModalidad);
        app
            .route("/api/modalidades/:id/logic")
            .delete(auth_1.authMiddleware, this.modalidadController.deleteModalidadAdv);
    }
}
exports.ModalidadRoutes = ModalidadRoutes;
//# sourceMappingURL=modalitie.js.map