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
    getAllTeams(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const teams = yield Team_1.default.findAll();
                res.status(200).json({ teams });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching teams" });
            }
        });
    }
    getTeamById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const team = yield Team_1.default.findOne({ where: { id: pk } });
                if (team) {
                    res.status(200).json({ team });
                }
                else {
                    res.status(404).json({ error: "Team not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching team" });
            }
        });
    }
    createTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { nombre, modality_id, ubicacion, estado, observaciones } = req.body;
            try {
                const body = {
                    nombre,
                    modality_id,
                    ubicacion,
                    estado,
                    observaciones,
                };
                const newTeam = yield Team_1.default.create(body);
                res.status(201).json(newTeam);
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error creating team" });
            }
        });
    }
    updateTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: pk } = req.params;
            const { nombre, modality_id, ubicacion, estado, observaciones } = req.body;
            try {
                const body = {
                    nombre,
                    modality_id,
                    ubicacion,
                    estado,
                    observaciones,
                };
                const teamExist = yield Team_1.default.findByPk(pk);
                if (teamExist) {
                    yield teamExist.update(body);
                    res.status(200).json(teamExist);
                }
                else {
                    res.status(404).json({ error: "Team not found" });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(400)
                    .json({ error: (_a = error.message) !== null && _a !== void 0 ? _a : "Error updating team" });
            }
        });
    }
    deleteTeam(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const teamToDelete = yield Team_1.default.findByPk(id);
                if (teamToDelete) {
                    yield teamToDelete.destroy();
                    res.status(200).json({ message: "Team deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Team not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting team" });
            }
        });
    }
    deleteTeamAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const teamToUpdate = yield Team_1.default.findByPk(pk);
                if (teamToUpdate) {
                    yield teamToUpdate.update({ estado: "MANTENIMIENTO" });
                    res.status(200).json({ message: "Team marked as MANTENIMIENTO" });
                }
                else {
                    res.status(404).json({ error: "Team not found" });
                }
            }
            catch (error) {
                console.error(error);
                res
                    .status(500)
                    .json({ error: "Error marking team as MANTENIMIENTO" });
            }
        });
    }
}
exports.TeamController = TeamController;
//# sourceMappingURL=team.controller.js.map