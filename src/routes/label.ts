// src/routes/label.routes.ts
import { Application } from "express";
import { LabelController } from "../controllers/label.controller";
import { authMiddleware } from "../middleware/auth";

export class LabelRoutes {
  public labelController: LabelController = new LabelController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/etiquetas/public")
      .get(this.labelController.getAllLabels)
      .post(this.labelController.createLabel);

    app.route("/api/etiquetas/public/:id")
      .get(this.labelController.getLabelById)
      .patch(this.labelController.updateLabel)
      .delete(this.labelController.deleteLabel);

    app.route("/api/etiquetas/public/:id/logic")
      .delete(this.labelController.deleteLabelAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/etiquetas")
      .get(authMiddleware, this.labelController.getAllLabels)
      .post(authMiddleware, this.labelController.createLabel);

    app.route("/api/etiquetas/:id")
      .get(authMiddleware, this.labelController.getLabelById)
      .patch(authMiddleware, this.labelController.updateLabel)
      .delete(authMiddleware, this.labelController.deleteLabel);

    app.route("/api/etiquetas/:id/logic")
      .delete(authMiddleware, this.labelController.deleteLabelAdv);
  }
}
