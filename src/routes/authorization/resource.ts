import { Application } from "express";
import { ResourceController } from "../../controllers/resource.controller";

export class ResourceRoutes {
  public resourceController: ResourceController = new ResourceController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/resources")
      .get(this.resourceController.getAllResources)
      .post(this.resourceController.createResource);

    app.route("/api/resources/:id")
      .get(this.resourceController.getResourceById)
      .patch(this.resourceController.updateResource)
      .delete(this.resourceController.deleteResource);

    app.route("/api/resources/:id/logic")
      .delete(this.resourceController.deleteResourceAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:


  }
}