"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamRoutes = void 0;
const team_controller_1 = require("../controllers/team.controller");
const auth_1 = require("../middleware/auth");
class TeamRoutes {
    constructor() {
        this.teamController = new team_controller_1.TeamController();
    }
    routes(app) {
        app.route("/api/equipos/public")
            .get(this.teamController.getAllTeams)
            .post(this.teamController.createTeam);
        app.route("/api/equipos/public/:id")
            .get(this.teamController.getTeamById)
            .patch(this.teamController.updateTeam)
            .delete(this.teamController.deleteTeam);
        app.route("/api/equipos/public/:id/logic")
            .delete(this.teamController.deleteTeamAdv);
        app.route("/api/equipos")
            .get(auth_1.authMiddleware, this.teamController.getAllTeams)
            .post(auth_1.authMiddleware, this.teamController.createTeam);
        app.route("/api/equipos/:id")
            .get(auth_1.authMiddleware, this.teamController.getTeamById)
            .patch(auth_1.authMiddleware, this.teamController.updateTeam)
            .delete(auth_1.authMiddleware, this.teamController.deleteTeam);
        app.route("/api/equipos/:id/logic")
            .delete(auth_1.authMiddleware, this.teamController.deleteTeamAdv);
    }
}
exports.TeamRoutes = TeamRoutes;
//# sourceMappingURL=team.js.map