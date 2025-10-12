import { Application } from "express";
import { RoleController } from '../../controllers/role.controller';

export class RoleRoutes {
  public roleController: RoleController = new RoleController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/roles")
      .get(this.roleController.getAllRoles)
      .post(this.roleController.createRole);

    app.route("/api/roles/:id")
      .get(this.roleController.getRoleById)
      .patch(this.roleController.updateRole)
      .delete(this.roleController.deleteRole);

    app.route("/api/roles/:id/logic")
      .delete(this.roleController.deleteRoleAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    // Si se requieren rutas protegidas, se pueden agregar aquí:



  }
}