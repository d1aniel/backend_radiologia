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
exports.ReportController = void 0;
const Report_1 = __importDefault(require("../models/Report"));
class ReportController {
    // Obtener todos los informes
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield Report_1.default.findAll();
                res.status(200).json({ reports });
            }
            catch (error) {
                console.error("getAllReports error:", error);
                res.status(500).json({ error: "Error fetching reports" });
            }
        });
    }
    // Obtener un informe por ID
    getReportById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const report = yield Report_1.default.findByPk(pk);
                if (report) {
                    res.status(200).json(report);
                }
                else {
                    res.status(404).json({ error: "Report not found" });
                }
            }
            catch (error) {
                console.error("getReportById error:", error);
                res.status(500).json({ error: "Error fetching report" });
            }
        });
    }
    // Crear un nuevo informe (valida 1:1 con estudioId)
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                // Verificar que no exista otro informe para el mismo estudio (1:1)
                const exists = yield Report_1.default.findOne({ where: { estudioId: body.estudioId } });
                if (exists) {
                    return res.status(400).json({ error: "El estudio ya tiene un informe" });
                }
                const report = yield Report_1.default.create(body);
                res.status(201).json(report);
            }
            catch (error) {
                console.error("createReport error:", error);
                // Si viene de validación de Sequelize, mandar mensaje más claro
                if ((error === null || error === void 0 ? void 0 : error.name) === "SequelizeValidationError" || (error === null || error === void 0 ? void 0 : error.name) === "SequelizeUniqueConstraintError") {
                    return res.status(400).json({ error: error.message });
                }
                res.status(500).json({ error: "Error creating report" });
            }
        });
    }
    // Actualizar un informe por ID
    updateReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const report = yield Report_1.default.findByPk(pk);
                if (!report) {
                    return res.status(404).json({ error: "Report not found" });
                }
                // Si vienen cambios en estudioId, asegurarse que no rompa la restricción 1:1
                if (body.estudioId && body.estudioId !== report.estudioId) {
                    const exists = yield Report_1.default.findOne({ where: { estudioId: body.estudioId } });
                    if (exists) {
                        return res.status(400).json({ error: "El nuevo estudioId ya tiene asociado un informe" });
                    }
                }
                yield report.update(body);
                res.status(200).json(report);
            }
            catch (error) {
                console.error("updateReport error:", error);
                res.status(500).json({ error: "Error updating report" });
            }
        });
    }
    // Firmar informe (cambiar estado a FIRMADO)
    signReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const report = yield Report_1.default.findByPk(pk);
                if (!report) {
                    return res.status(404).json({ error: "Report not found" });
                }
                yield report.update({ estado: "FIRMADO" });
                res.status(200).json({ message: "Report signed", report });
            }
            catch (error) {
                console.error("signReport error:", error);
                res.status(500).json({ error: "Error signing report" });
            }
        });
    }
    // Eliminar informe (borrar fila)
    deleteReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const report = yield Report_1.default.findByPk(pk);
                if (!report) {
                    return res.status(404).json({ error: "Report not found" });
                }
                yield report.destroy();
                res.status(200).json({ message: "Report deleted" });
            }
            catch (error) {
                console.error("deleteReport error:", error);
                res.status(500).json({ error: "Error deleting report" });
            }
        });
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map