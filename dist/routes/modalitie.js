"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModalidadRoutes = void 0;
const modalitie_controller_1 = require("../controllers/modalitie.controller");
class ModalidadRoutes {
    constructor() {
        this.modalidadController = new modalitie_controller_1.ModalidadController();
    }
    routes(app) {
        // Obtener todas las modalidades activas
        app.route("/modalidades").get(this.modalidadController.getAllModalidades);
        // Obtener modalidad por ID
        app.route("/modalidades/:id").get(this.modalidadController.getModalidadById);
        // Crear nueva modalidad
        app.route("/modalidades").post(this.modalidadController.createModalidad);
        // Actualizar modalidad por ID
        app.route("/modalidades/:id").put(this.modalidadController.updateModalidad);
        // Eliminar modalidad (status = inactiva)
        app
            .route("/modalidades/:id")
            .delete(this.modalidadController.deleteModalidad);
    }
}
exports.ModalidadRoutes = ModalidadRoutes;
//# sourceMappingURL=modalitie.js.map