import { Application } from "express";
import { ModalidadController } from "../controllers/modalitie.controller";

export class ModalidadRoutes {
  public modalidadController: ModalidadController = new ModalidadController();

  public routes(app: Application): void {
    // Obtener todas las modalidades activas
    app.route("/modalidades").get(this.modalidadController.getAllModalidades);

    // Obtener modalidad por ID
    app.route("/modalidades/:id").get(this.modalidadController.getModalidadById);

    // Crear nueva modalidad
    app.route("/modalidades").post(this.modalidadController.createModalidad);

    // Actualizar modalidad por ID
    app.route("/modalidades/:id").put(this.modalidadController.updateModalidad);

    // Eliminar modalidad (status = inactiva)
    app
      .route("/modalidades/:id")
      .delete(this.modalidadController.deleteModalidad);
  }
}
