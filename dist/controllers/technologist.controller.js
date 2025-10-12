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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologistController = void 0;
const Technologist_1 = require("../models/Technologist");
class TechnologistController {
    // Obtener todos los tecnólogos activos
    getAllTechnologists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technologists = yield Technologist_1.Technologist.findAll({
                    where: { status: "ACTIVE" },
                });
                res.status(200).json({ technologists });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching technologists" });
            }
        });
    }
    // Obtener un tecnólogo por ID
    getTechnologistById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const technologist = yield Technologist_1.Technologist.findOne({
                    where: { id: pk, status: "ACTIVE" },
                });
                if (technologist) {
                    res.status(200).json(technologist);
                }
                else {
                    res.status(404).json({ error: "Technologist not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching technologist" });
            }
        });
    }
    // Crear un nuevo tecnólogo
    createTechnologist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const technologist = yield Technologist_1.Technologist.create(body);
                res.status(201).json(technologist);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating technologist" });
            }
        });
    }
    // Actualizar un tecnólogo por ID
    updateTechnologist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const technologist = yield Technologist_1.Technologist.findByPk(pk);
                if (!technologist) {
                    return res.status(404).json({ error: "Technologist not found" });
                }
                yield technologist.update(body);
                res.status(200).json(technologist);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating technologist" });
            }
        });
    }
    // Eliminar (cambiar status a INACTIVE)
    deleteTechnologist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const technologist = yield Technologist_1.Technologist.findByPk(pk);
                if (!technologist) {
                    return res.status(404).json({ error: "Technologist not found" });
                }
                yield technologist.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Technologist set to INACTIVE" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting technologist" });
            }
        });
    }
}
exports.TechnologistController = TechnologistController;
//# sourceMappingURL=technologist.controller.js.map