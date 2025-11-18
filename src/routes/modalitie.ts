
import { Application } from "express";
import { ModalidadController } from "../controllers/modalitie.controller";
import { authMiddleware } from "../middleware/auth";

export class ModalidadRoutes {
  public modalidadController: ModalidadController = new ModalidadController();

  public routes(app: Application): void {
    // ================== RUTAS PÚBLICAS ==================
    app
      .route("/api/modalidades/public")
      .get(this.modalidadController.getAllModalidades)
      .post(this.modalidadController.createModalidad);

    app
      .route("/api/modalidades/public/:id")
      .get(this.modalidadController.getModalidadById)
      .patch(this.modalidadController.updateModalidad)
      .delete(this.modalidadController.deleteModalidad); 

    
    app
      .route("/api/modalidades/public/:id/logic")
      .delete(this.modalidadController.deleteModalidadAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app
      .route("/api/modalidades")
      .get(authMiddleware, this.modalidadController.getAllModalidades)
      .post(authMiddleware, this.modalidadController.createModalidad);

    app
      .route("/api/modalidades/:id")
      .get(authMiddleware, this.modalidadController.getModalidadById)
      .patch(authMiddleware, this.modalidadController.updateModalidad)
      .delete(authMiddleware, this.modalidadController.deleteModalidad);

    
    app
      .route("/api/modalidades/:id/logic")
      .delete(authMiddleware, this.modalidadController.deleteModalidadAdv);
  }
}
