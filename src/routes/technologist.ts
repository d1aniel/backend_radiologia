import { Application } from "express";
import { TechnologistController } from "../controllers/technologist.controller";

export class TechnologistRoutes {
  public technologistController: TechnologistController = new TechnologistController();

  public routes(app: Application): void {
    // Obtener todos los tecnólogos activos
    app.route("/technologists").get(this.technologistController.getAllTechnologists);

    // Obtener un tecnólogo por ID
    app.route("/technologists/:id").get(this.technologistController.getTechnologistById);

    // Crear un nuevo tecnólogo
    app.route("/technologists").post(this.technologistController.createTechnologist);

    // Actualizar un tecnólogo por ID
    app.route("/technologists/:id").put(this.technologistController.updateTechnologist);

    // Eliminar (status = INACTIVE)
    app.route("/technologists/:id").delete(this.technologistController.deleteTechnologist);
  }
}
