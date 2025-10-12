// src/routes/study.routes.ts
import { Application } from "express";
import { StudyController } from "../controllers/studie.controller";
import { authMiddleware } from "../middleware/auth";

export class StudyRoutes {
  public studyController: StudyController = new StudyController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/estudios/public")
      .get(this.studyController.getAllStudies)
      .post(this.studyController.createStudy);

    app.route("/api/estudios/public/:id")
      .get(this.studyController.getStudyById)
      .patch(this.studyController.updateStudy)
      .delete(this.studyController.deleteStudy); // si más adelante quieres borrado físico cambia aquí

    // Si quieres una ruta explícita para borrado lógico (marcar INACTIVE)
    app.route("/api/estudios/public/:id/logic")
      .delete(this.studyController.deleteStudy);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/estudios")
      .get(authMiddleware, this.studyController.getAllStudies)
      .post(authMiddleware, this.studyController.createStudy);

    app.route("/api/estudios/:id")
      .get(authMiddleware, this.studyController.getStudyById)
      .patch(authMiddleware, this.studyController.updateStudy)
      .delete(authMiddleware, this.studyController.deleteStudy);

    app.route("/api/estudios/:id/logic")
      .delete(authMiddleware, this.studyController.deleteStudy);
  }
}
