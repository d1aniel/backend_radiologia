import { Router, Application } from "express";
import { ReportController } from "../controllers/report.controller";

export class ReportRoutes {
  public reportController: ReportController = new ReportController();

  public routes(app: Application): void {
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
