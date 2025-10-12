import { Application } from "express";
import { RoleUserController } from '../../controllers/role_user.controller';

export class RoleUserRoutes {
  public roleUserController: RoleUserController = new RoleUserController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/roleUsers")
      .get(this.roleUserController.getAllRoleUsers)
      .post(this.roleUserController.createRoleUser);

    app.route("/api/roleUsers/:id")
      .get(this.roleUserController.getRoleUserById)
      .patch(this.roleUserController.updateRoleUser)
      .delete(this.roleUserController.deleteRoleUser);

    app.route("/api/roleUsers/:id/logic")
      .delete(this.roleUserController.deleteRoleUserAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================



  }
}