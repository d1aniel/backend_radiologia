// src/routes/report.routes.ts
import { Application } from "express";
import { ReportController } from "../controllers/report.controller";
import { authMiddleware } from "../middleware/auth";

export class ReportRoutes {
  public reportController: ReportController = new ReportController();

  public routes(app: Application): void {
    // ================== RUTAS PÚBLICAS ==================
    // app.route("/api/informes/public")
    //   .get(this.reportController.getAllReports)
    //   .post(this.reportController.createReport);

    // app.route("/api/informes/public/:id")
    //   .get(this.reportController.getReportById)
    //   .patch(this.reportController.updateReport)
    //   .delete(this.reportController.deleteReport);

    // // ruta para eliminación lógica pública (si la quieres disponible sin auth)
    // app.route("/api/informes/public/:id/logic")
    //   .delete(this.reportController.deleteReportAdv);

    // // firmar (público) — normalmente esto debería requerir auth, lo dejo por consistencia con pacientes
    // app.route("/api/informes/public/:id/sign")
    //   .put(this.reportController.signReport);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/informes")
      .get(authMiddleware, this.reportController.getAllReports)
      .post(authMiddleware, this.reportController.createReport);

    app.route("/api/informes/:id")
      .get(authMiddleware, this.reportController.getReportById)
      .patch(authMiddleware, this.reportController.updateReport)
      .delete(authMiddleware, this.reportController.deleteReport);

    app.route("/api/informes/:id/logic")
      .delete(authMiddleware, this.reportController.deleteReportAdv);

    // firmar (protegido)
    app.route("/api/informes/:id/sign")
      .put(authMiddleware, this.reportController.signReport);
  }
}
