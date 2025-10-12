"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologistRoutes = void 0;
const technologist_controller_1 = require("../controllers/technologist.controller");
class TechnologistRoutes {
    constructor() {
        this.technologistController = new technologist_controller_1.TechnologistController();
    }
    routes(app) {
        // Obtener todos los tecnólogos activos
        app.route("/technologists").get(this.technologistController.getAllTechnologists);
        // Obtener un tecnólogo por ID
        app.route("/technologists/:id").get(this.technologistController.getTechnologistById);
        // Crear un nuevo tecnólogo
        app.route("/technologists").post(this.technologistController.createTechnologist);
        // Actualizar un tecnólogo por ID
        app.route("/technologists/:id").put(this.technologistController.updateTechnologist);
        // Eliminar (status = INACTIVE)
        app.route("/technologists/:id").delete(this.technologistController.deleteTechnologist);
    }
}
exports.TechnologistRoutes = TechnologistRoutes;
//# sourceMappingURL=technologist.js.map