"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudyRoutes = void 0;
const studie_controller_1 = require("../controllers/studie.controller");
class StudyRoutes {
    constructor() {
        this.studyController = new studie_controller_1.StudyController();
    }
    routes(app) {
        // Listar estudios activos
        app.route("/studies").get(this.studyController.getAllStudies);
        // Obtener un estudio por ID
        app.route("/studies/:id").get(this.studyController.getStudyById);
        // Crear estudio
        app.route("/studies").post(this.studyController.createStudy);
        // Actualizar estudio por ID
        app.route("/studies/:id").put(this.studyController.updateStudy);
        // Eliminar (status = INACTIVE)
        app.route("/studies/:id").delete(this.studyController.deleteStudy);
    }
}
exports.StudyRoutes = StudyRoutes;
//# sourceMappingURL=studie.js.map