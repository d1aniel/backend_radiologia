import { Application } from "express";
import { PatientRoutes } from "./pacient";

export class Routes {
  public patientRoutes: PatientRoutes = new PatientRoutes();

  public routes(app: Application): void {
    // rutas de pacientes
    this.patientRoutes.routes(app);
  }
}
