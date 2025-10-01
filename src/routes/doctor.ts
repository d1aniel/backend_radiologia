import { Router, Application } from "express";
import { DoctorController } from "../controllers/doctor.controller";

export class DoctorRoutes {
  public doctorController: DoctorController = new DoctorController();

  public routes(app: Application): void {
    // Obtener todos los doctores activos
    app.route("/doctors").get(this.doctorController.getAllDoctors);

    // Obtener un doctor por ID
    app.route("/doctors/:id").get(this.doctorController.getDoctorById);

    // Crear un nuevo doctor
    app.route("/doctors").post(this.doctorController.createDoctor);

    // Actualizar un doctor por ID
    app.route("/doctors/:id").put(this.doctorController.updateDoctor);

    // Eliminar (status = INACTIVE)
    app.route("/doctors/:id").delete(this.doctorController.deleteDoctor);
  }
}
