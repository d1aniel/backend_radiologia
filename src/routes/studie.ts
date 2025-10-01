import { Router, Application } from "express";
import { StudyController } from "../controllers/studie.controller";

export class StudyRoutes {
  public studyController: StudyController = new StudyController();

  public routes(app: Application): void {
    // Listar estudios activos
    app.route("/studies").get(this.studyController.getAllStudies);

    // Obtener un estudio por ID
    app.route("/studies/:id").get(this.studyController.getStudyById);

    // Crear estudio
    app.route("/studies").post(this.studyController.createStudy);

    // Actualizar estudio por ID
    app.route("/studies/:id").put(this.studyController.updateStudy);

    // Eliminar (status = INACTIVE)
    app.route("/studies/:id").delete(this.studyController.deleteStudy);
  }
}
