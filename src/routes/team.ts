// src/routes/team.routes.ts
import { Router, Application } from "express";
import { TeamController } from "../controllers/team.controller";

export class TeamRoutes {
  public teamController: TeamController = new TeamController();

  public routes(app: Application): void {
    // Obtener todos los equipos
    app.route("/teams").get(this.teamController.getAllTeams);

    // Obtener un equipo por ID
    app.route("/teams/:id").get(this.teamController.getTeamById);

    // Crear un nuevo equipo
    app.route("/teams").post(this.teamController.createTeam);

    // Actualizar un equipo por ID
    app.route("/teams/:id").put(this.teamController.updateTeam);

    // Eliminar un equipo por ID
    app.route("/teams/:id").delete(this.teamController.deleteTeam);
  }
}
