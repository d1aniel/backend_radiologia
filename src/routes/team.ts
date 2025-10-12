// src/routes/team.routes.ts
import { Application } from "express";
import { TeamController } from "../controllers/team.controller";
import { authMiddleware } from "../middleware/auth";

export class TeamRoutes {
  public teamController: TeamController = new TeamController();

  public routes(app: Application): void {
    // ================== RUTAS SIN AUTENTICACIÓN ==================
    app.route("/api/equipos/public")
      .get(this.teamController.getAllTeams)
      .post(this.teamController.createTeam);

    app.route("/api/equipos/public/:id")
      .get(this.teamController.getTeamById)
      .patch(this.teamController.updateTeam)
      .delete(this.teamController.deleteTeam);

    app.route("/api/equipos/public/:id/logic")
      .delete(this.teamController.deleteTeamAdv);

    // ================== RUTAS CON AUTENTICACIÓN ==================
    app.route("/api/equipos")
      .get(authMiddleware, this.teamController.getAllTeams)
      .post(authMiddleware, this.teamController.createTeam);

    app.route("/api/equipos/:id")
      .get(authMiddleware, this.teamController.getTeamById)
      .patch(authMiddleware, this.teamController.updateTeam)
      .delete(authMiddleware, this.teamController.deleteTeam);

    app.route("/api/equipos/:id/logic")
      .delete(authMiddleware, this.teamController.deleteTeamAdv);
  }
}
