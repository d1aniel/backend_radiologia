import { Router, Application } from "express";
import { PatientController } from "../controllers/pacient.controller";

export class PatientRoutes {
  public patientController: PatientController = new PatientController();

  public routes(app: Application): void {
    // Obtener todos los pacientes activos
    app.route("/patients").get(this.patientController.getAllPatients);

    // Obtener un paciente por ID
    app.route("/patients/:id").get(this.patientController.getPatientById);

    // Crear un nuevo paciente
    app.route("/patients").post(this.patientController.createPatient);

    // Actualizar un paciente por ID
    app.route("/patients/:id").put(this.patientController.updatePatient);

    // Eliminar (status = INACTIVE)
    app.route("/patients/:id").delete(this.patientController.deletePatient);
  }
}
