// src/routes/patient.routes.ts
import { Application } from "express";
import { PatientController } from "../controllers/pacient.controller";
import { authMiddleware } from "../middleware/auth";

export class PatientRoutes {
  public patientController: PatientController = new PatientController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    // app.route("/api/pacientes/public")
    //   .get(this.patientController.getAllPatients)
    //   .post(this.patientController.createPatient);

    // app.route("/api/pacientes/public/:id")
    //   .get(this.patientController.getPatientById)
    //   .patch(this.patientController.updatePatient)
    //   .delete(this.patientController.deletePatient);

    // app.route("/api/pacientes/public/:id/logic")
    //   .delete(this.patientController.deletePatientAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/pacientes")
      .get(authMiddleware, this.patientController.getAllPatients)
      .post(authMiddleware, this.patientController.createPatient);

    app.route("/api/pacientes/:id")
      .get(authMiddleware, this.patientController.getPatientById)
      .patch(authMiddleware, this.patientController.updatePatient)
      .delete(authMiddleware, this.patientController.deletePatient);

    app.route("/api/pacientes/:id/logic")
      .delete(authMiddleware, this.patientController.deletePatientAdv);
  }
}
