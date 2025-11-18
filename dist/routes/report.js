"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportRoutes = void 0;
const report_controller_1 = require("../controllers/report.controller");
const auth_1 = require("../middleware/auth");
class ReportRoutes {
    constructor() {
        this.reportController = new report_controller_1.ReportController();
    }
    routes(app) {
        app.route("/api/informes")
            .get(auth_1.authMiddleware, this.reportController.getAllReports)
            .post(auth_1.authMiddleware, this.reportController.createReport);
        app.route("/api/informes/:id")
            .get(auth_1.authMiddleware, this.reportController.getReportById)
            .patch(auth_1.authMiddleware, this.reportController.updateReport)
            .delete(auth_1.authMiddleware, this.reportController.deleteReport);
        app.route("/api/informes/:id/logic")
            .delete(auth_1.authMiddleware, this.reportController.deleteReportAdv);
        app.route("/api/informes/:id/sign")
            .put(auth_1.authMiddleware, this.reportController.signReport);
    }
}
exports.ReportRoutes = ReportRoutes;
//# sourceMappingURL=report.js.map