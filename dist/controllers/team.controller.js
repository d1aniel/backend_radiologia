"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamController = void 0;
const Team_1 = __importDefault(require("../models/Team"));
class TeamController {
    // Obtener todos los equipos
    getAllTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teams = yield Team_1.default.findAll();
                res.status(200).json({ teams });
            }
            catch (error) {
                console.error("getAllTeams error:", error);
                res.status(500).json({ error: "Error fetching teams" });
            }
        });
    }
    // Obtener un equipo por ID
    getTeamById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const team = yield Team_1.default.findOne({ where: { id: pk } });
                if (team) {
                    res.status(200).json(team);
                }
                else {
                    res.status(404).json({ error: "Team not found" });
                }
            }
            catch (error) {
                console.error("getTeamById error:", error);
                res.status(500).json({ error: "Error fetching team" });
            }
        });
    }
    // Crear un nuevo equipo
    createTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const team = yield Team_1.default.create(body);
                res.status(201).json(team);
            }
            catch (error) {
                console.error("createTeam error:", error);
                res.status(500).json({ error: "Error creating team" });
            }
        });
    }
    // Actualizar un equipo por ID
    updateTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const team = yield Team_1.default.findByPk(pk);
                if (!team) {
                    return res.status(404).json({ error: "Team not found" });
                }
                yield team.update(body);
                res.status(200).json(team);
            }
            catch (error) {
                console.error("updateTeam error:", error);
                res.status(500).json({ error: "Error updating team" });
            }
        });
    }
    // Eliminar un equipo (borrado físico)
    deleteTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const team = yield Team_1.default.findByPk(pk);
                if (!team) {
                    return res.status(404).json({ error: "Team not found" });
                }
                yield team.destroy();
                res.status(200).json({ message: "Team deleted" });
            }
            catch (error) {
                console.error("deleteTeam error:", error);
                res.status(500).json({ error: "Error deleting team" });
            }
        });
    }
}
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map