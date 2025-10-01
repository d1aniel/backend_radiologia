import { Application } from "express";
import { LabelController } from "../controllers/label.controller";

export class LabelRoutes {
  public labelController: LabelController = new LabelController();

  public routes(app: Application): void {
    // Obtener todas las etiquetas activas
    app.route("/labels").get(this.labelController.getAllLabels);

    // Obtener una etiqueta por ID
    app.route("/labels/:id").get(this.labelController.getLabelById);

    // Crear una nueva etiqueta
    app.route("/labels").post(this.labelController.createLabel);

    // Actualizar una etiqueta por ID
    app.route("/labels/:id").put(this.labelController.updateLabel);

    // Eliminar (status = INACTIVE)
    app.route("/labels/:id").delete(this.labelController.deleteLabel);
  }
}
