"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const team_controller_1 = require("../controllers/team.controller");
class TeamRoutes {
    constructor() {
        this.teamController = new team_controller_1.TeamController();
    }
    routes(app) {
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
exports.TeamRoutes = TeamRoutes;
//# sourceMappingURL=team.js.map