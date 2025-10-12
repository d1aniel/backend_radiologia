"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const report_controller_1 = require("../controllers/report.controller");
class ReportRoutes {
    constructor() {
        this.reportController = new report_controller_1.ReportController();
    }
    routes(app) {
        // Obtener todos los informes
        app.route("/reports").get(this.reportController.getAllReports);
        // Obtener un informe por ID
        app.route("/reports/:id").get(this.reportController.getReportById);
        // Crear un nuevo informe
        app.route("/reports").post(this.reportController.createReport);
        // Actualizar un informe por ID
        app.route("/reports/:id").put(this.reportController.updateReport);
        // Firmar informe (cambiar estado a FIRMADO)
        app.route("/reports/:id/sign").put(this.reportController.signReport);
        // Eliminar informe
        app.route("/reports/:id").delete(this.reportController.deleteReport);
    }
}
exports.ReportRoutes = ReportRoutes;
//# sourceMappingURL=report.js.map