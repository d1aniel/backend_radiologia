// src/routes/doctor.routes.ts
import { Application } from "express";
import { DoctorController } from "../controllers/doctor.controller";
import { authMiddleware } from "../middleware/auth";

export class DoctorRoutes {
  public doctorController: DoctorController = new DoctorController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/doctores/public")
      .get(this.doctorController.getAllDoctors)
      .post(this.doctorController.createDoctor);

    app.route("/api/doctores/public/:id")
      .get(this.doctorController.getDoctorById)
      .patch(this.doctorController.updateDoctor)
      .delete(this.doctorController.deleteDoctor); // físico

    app.route("/api/doctores/public/:id/logic")
      .delete(this.doctorController.deleteDoctorAdv); // lógico (status = INACTIVE)

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/doctores")
      .get(authMiddleware, this.doctorController.getAllDoctors)
      .post(authMiddleware, this.doctorController.createDoctor);

    app.route("/api/doctores/:id")
      .get(authMiddleware, this.doctorController.getDoctorById)
      .patch(authMiddleware, this.doctorController.updateDoctor)
      .delete(authMiddleware, this.doctorController.deleteDoctor); // físico

    app.route("/api/doctores/:id/logic")
      .delete(authMiddleware, this.doctorController.deleteDoctorAdv); // lógico
  }
}
