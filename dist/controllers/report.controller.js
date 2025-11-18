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
    getAllReports(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const reports = yield Report_1.default.findAll();
                res.status(200).json({ reports });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching reports" });
            }
        });
    }
    getReportById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const report = yield Report_1.default.findByPk(pk);
                if (report) {
                    res.status(200).json({ report });
                }
                else {
                    res.status(404).json({ error: "Report not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching report" });
            }
        });
    }
    createReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { estudio_id, estudioId, estado, cuerpo, medico_id, medicoId, } = req.body;
                const finalEstudioId = estudio_id !== null && estudio_id !== void 0 ? estudio_id : estudioId;
                const finalMedicoId = medico_id !== null && medico_id !== void 0 ? medico_id : medicoId;
                if (!finalEstudioId) {
                    return res.status(400).json({ error: "estudio_id es obligatorio" });
                }
                if (!finalMedicoId) {
                    return res.status(400).json({ error: "medico_id es obligatorio" });
                }
                const body = {
                    estudioId: finalEstudioId,
                    estado,
                    cuerpo,
                    medicoId: finalMedicoId,
                };
                const exists = yield Report_1.default.findOne({
                    where: { estudioId: body.estudioId },
                });
                if (exists) {
                    return res
                        .status(400)
                        .json({ error: "El estudio ya tiene un informe" });
                }
                const newReport = yield Report_1.default.create(body);
                res.status(201).json(newReport);
            }
            catch (error) {
                console.error(error);
                if ((error === null || error === void 0 ? void 0 : error.name) === "SequelizeValidationError" ||
                    (error === null || error === void 0 ? void 0 : error.name) === "SequelizeUniqueConstraintError") {
                    return res.status(400).json({ error: error.message });
                }
                res.status(500).json({ error: "Error creating report" });
            }
        });
    }
    updateReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const { estudio_id, estudioId, estado, cuerpo, medico_id, medicoId, } = req.body;
                const newEstudioId = estudio_id !== null && estudio_id !== void 0 ? estudio_id : estudioId;
                const newMedicoId = medico_id !== null && medico_id !== void 0 ? medico_id : medicoId;
                const report = yield Report_1.default.findByPk(pk);
                if (!report) {
                    return res.status(404).json({ error: "Report not found" });
                }
                if (typeof newEstudioId !== "undefined" &&
                    newEstudioId !== report.estudioId) {
                    const exists = yield Report_1.default.findOne({
                        where: { estudioId: newEstudioId },
                    });
                    if (exists) {
                        return res.status(400).json({
                            error: "El nuevo estudio ya tiene asociado un informe",
                        });
                    }
                }
                const patch = {};
                if (typeof newEstudioId !== "undefined")
                    patch.estudioId = newEstudioId;
                if (typeof estado !== "undefined")
                    patch.estado = estado;
                if (typeof cuerpo !== "undefined")
                    patch.cuerpo = cuerpo;
                if (typeof newMedicoId !== "undefined")
                    patch.medicoId = newMedicoId;
                yield report.update(patch);
                res.status(200).json(report);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error updating report" });
            }
        });
    }
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
                console.error(error);
                res.status(500).json({ error: "Error signing report" });
            }
        });
    }
    deleteReport(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const reportToDelete = yield Report_1.default.findByPk(id);
                if (reportToDelete) {
                    yield reportToDelete.destroy();
                    res.status(200).json({ message: "Report deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Report not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting report" });
            }
        });
    }
    deleteReportAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const reportToUpdate = yield Report_1.default.findByPk(pk);
                if (reportToUpdate) {
                    yield reportToUpdate.update({ estado: "BORRADOR" });
                    res.status(200).json({ message: "Report marked as borrador" });
                }
                else {
                    res.status(404).json({ error: "Report not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error marking report" });
            }
        });
    }
}
exports.ReportController = ReportController;
//# sourceMappingURL=report.controller.js.map