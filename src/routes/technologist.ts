// src/routes/technologist.routes.ts
import { Application } from "express";
import { TechnologistController } from "../controllers/technologist.controller";
import { authMiddleware } from "../middleware/auth";

export class TechnologistRoutes {
  public technologistController: TechnologistController = new TechnologistController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/tecnologos/public")
      .get(this.technologistController.getAllTechnologists)
      .post(this.technologistController.createTechnologist);

    app.route("/api/tecnologos/public/:id")
      .get(this.technologistController.getTechnologistById)
      .patch(this.technologistController.updateTechnologist)
      .delete(this.technologistController.deleteTechnologist);

    app.route("/api/tecnologos/public/:id/logic")
      .delete(this.technologistController.deleteTechnologistAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/tecnologos")
      .get(authMiddleware, this.technologistController.getAllTechnologists)
      .post(authMiddleware, this.technologistController.createTechnologist);

    app.route("/api/tecnologos/:id")
      .get(authMiddleware, this.technologistController.getTechnologistById)
      .patch(authMiddleware, this.technologistController.updateTechnologist)
      .delete(authMiddleware, this.technologistController.deleteTechnologist);

    app.route("/api/tecnologos/:id/logic")
      .delete(authMiddleware, this.technologistController.deleteTechnologistAdv);
  }
}
