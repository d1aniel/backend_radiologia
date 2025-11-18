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
exports.StudyController = void 0;
const connection_1 = __importDefault(require("../database/connection"));
const Studie_1 = require("../models/Studie");
const Pacient_1 = require("../models/Pacient");
const Label_1 = require("../models/Label");
const Doctor_1 = require("../models/Doctor");
const Technologist_1 = require("../models/Technologist");
const Modalitie_1 = require("../models/Modalitie");
const Team_1 = require("../models/Team");
const Image_1 = require("../models/Image");
const Quote_1 = require("../models/Quote");
const STUDY_INCLUDE = [
    { model: Pacient_1.Patient, as: "patient", attributes: ["id", "nombre", "apellido", "documento"] },
    { model: Doctor_1.Doctor, as: "doctor", attributes: ["id", "nombre"] },
    { model: Technologist_1.Technologist, as: "technologist_user", attributes: ["id", "nombre"] },
    { model: Modalitie_1.Modalidad, as: "modalidad_obj", attributes: ["id", "nombre"] },
    { model: Team_1.Team, as: "team_obj", attributes: ["id", "nombre"] },
    { model: Quote_1.Quote, as: "cita_obj", attributes: ["id"] },
    { model: Image_1.Image, as: "imagenes", attributes: ["id", "url", "nombreArchivo", "tipo"] },
    { model: Label_1.Label, as: "labels", attributes: ["id", "nombre"], through: { attributes: [] } },
];
class StudyController {
    getAllStudies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studies = yield Studie_1.Study.findAll({
                    where: { status: "ACTIVE" },
                    include: STUDY_INCLUDE,
                    order: [["fechaHora", "DESC"]],
                });
                res.status(200).json({ studies });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching studies" });
            }
        });
    }
    getStudyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const study = yield Studie_1.Study.findOne({
                    where: { id: pk, status: "ACTIVE" },
                    include: STUDY_INCLUDE,
                });
                if (!study)
                    return res.status(404).json({ error: "Study not found or inactive" });
                res.status(200).json({ study });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching study" });
            }
        });
    }
    createStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { patient_id, modality_id, team_id, technologist_id = null, medico_id = null, quote_id = null, fechaHora, prioridad = "MEDIA", motivo, status = "ACTIVE", labels = [], } = req.body;
            try {
                if (!patient_id)
                    return res.status(400).json({ error: "patient_id is required" });
                if (!modality_id)
                    return res.status(400).json({ error: "modality_id is required" });
                if (!team_id)
                    return res.status(400).json({ error: "team_id is required" });
                if (!fechaHora)
                    return res.status(400).json({ error: "fechaHora is required" });
                if (!motivo)
                    return res.status(400).json({ error: "motivo is required" });
                console.log("[createStudy] req.body:", req.body);
                const patient = yield Pacient_1.Patient.findOne({ where: { id: patient_id, status: "ACTIVATE" } });
                if (!patient)
                    return res.status(400).json({ error: "Patient not found or inactive" });
                const modality = yield Modalitie_1.Modalidad.findByPk(modality_id);
                if (!modality) {
                    return res.status(400).json({ error: "Modality not found" });
                }
                const team = yield Team_1.Team.findByPk(team_id);
                if (!team) {
                    return res.status(400).json({ error: "Team not found" });
                }
                let medicoNombre = null;
                if (medico_id) {
                    const doctor = yield Doctor_1.Doctor.findByPk(medico_id);
                    if (!doctor) {
                        return res.status(400).json({ error: "Doctor not found" });
                    }
                    medicoNombre = doctor.nombre;
                }
                let tecnologoNombre = null;
                if (technologist_id) {
                    const tecn = yield Technologist_1.Technologist.findByPk(technologist_id);
                    if (!tecn) {
                        return res.status(400).json({ error: "Technologist not found" });
                    }
                    tecnologoNombre = tecn.nombre;
                }
                const validPriorities = ["BAJA", "MEDIA", "ALTA", "URGENTE"];
                let prioridadFinal = "MEDIA";
                if (prioridad && typeof prioridad === "string") {
                    const upper = prioridad.toUpperCase();
                    if (!validPriorities.includes(upper)) {
                        return res.status(400).json({ error: `prioridad inválida: ${prioridad}` });
                    }
                    prioridadFinal = upper;
                }
                const fecha = new Date(fechaHora);
                if (isNaN(fecha.getTime())) {
                    return res.status(400).json({ error: `fechaHora inválida: ${fechaHora}` });
                }
                const transaction = yield connection_1.default.transaction();
                try {
                    const newStudy = yield Studie_1.Study.create({
                        patient_id,
                        modality_id,
                        team_id,
                        technologist_id,
                        medico_id,
                        quote_id,
                        fechaHora: fecha,
                        prioridad: prioridadFinal,
                        motivo,
                        status: status === "INACTIVE" ? "INACTIVE" : "ACTIVE",
                        modalidad: modality.nombre,
                        equipo: team.nombre,
                        medico: medicoNombre,
                        tecnologo: tecnologoNombre,
                    }, { transaction });
                    if (Array.isArray(labels) && labels.length > 0) {
                        const existing = yield Label_1.Label.findAll({ where: { id: labels } });
                        const ids = existing.map(l => l.id);
                        yield newStudy.setLabels(ids, { transaction });
                    }
                    yield transaction.commit();
                    const created = yield Studie_1.Study.findByPk(newStudy.id, { include: STUDY_INCLUDE });
                    return res.status(201).json({ study: created });
                }
                catch (error) {
                    yield transaction.rollback();
                    console.error("[createStudy] Sequelize error:", error === null || error === void 0 ? void 0 : error.name, error === null || error === void 0 ? void 0 : error.message);
                    console.error(error);
                    return res.status(500).json({ error: "Error creating study", details: error === null || error === void 0 ? void 0 : error.message });
                }
            }
            catch (error) {
                console.error("[createStudy] Outer error:", error);
                return res.status(500).json({ error: "Error creating study" });
            }
        });
    }
    updateStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { id: pk } = req.params;
                const { patient_id, modality_id, team_id, technologist_id, medico_id, quote_id, fechaHora, prioridad, motivo, status, labels, } = req.body;
                const study = yield Studie_1.Study.findByPk(pk);
                if (!study)
                    return res.status(404).json({ error: "Study not found" });
                if (patient_id) {
                    const patient = yield Pacient_1.Patient.findOne({ where: { id: patient_id, status: "ACTIVATE" } });
                    if (!patient)
                        return res.status(400).json({ error: "Patient not found or inactive" });
                }
                let modalidadNombre = study.modalidad;
                if (modality_id) {
                    const modality = yield Modalitie_1.Modalidad.findByPk(modality_id);
                    if (!modality) {
                        return res.status(400).json({ error: "Modality not found" });
                    }
                    modalidadNombre = modality.nombre;
                }
                let equipoNombre = study.equipo;
                if (team_id) {
                    const team = yield Team_1.Team.findByPk(team_id);
                    if (!team) {
                        return res.status(400).json({ error: "Team not found" });
                    }
                    equipoNombre = team.nombre;
                }
                let medicoNombre = (_a = study.medico) !== null && _a !== void 0 ? _a : null;
                if (medico_id) {
                    const doctor = yield Doctor_1.Doctor.findByPk(medico_id);
                    if (!doctor) {
                        return res.status(400).json({ error: "Doctor not found" });
                    }
                    medicoNombre = doctor.nombre;
                }
                let tecnologoNombre = (_b = study.tecnologo) !== null && _b !== void 0 ? _b : null;
                if (technologist_id) {
                    const tecn = yield Technologist_1.Technologist.findByPk(technologist_id);
                    if (!tecn) {
                        return res.status(400).json({ error: "Technologist not found" });
                    }
                    tecnologoNombre = tecn.nombre;
                }
                let prioridadFinal = study.prioridad;
                if (prioridad) {
                    const validPriorities = ["BAJA", "MEDIA", "ALTA", "URGENTE"];
                    const upper = String(prioridad).toUpperCase();
                    if (!validPriorities.includes(upper)) {
                        return res.status(400).json({ error: `prioridad inválida: ${prioridad}` });
                    }
                    prioridadFinal = upper;
                }
                const transaction = yield connection_1.default.transaction();
                try {
                    yield study.update({
                        patient_id: patient_id !== null && patient_id !== void 0 ? patient_id : study.patient_id,
                        modality_id: modality_id !== null && modality_id !== void 0 ? modality_id : study.modality_id,
                        team_id: team_id !== null && team_id !== void 0 ? team_id : study.team_id,
                        technologist_id: technologist_id !== null && technologist_id !== void 0 ? technologist_id : study.technologist_id,
                        medico_id: medico_id !== null && medico_id !== void 0 ? medico_id : study.medico_id,
                        quote_id: quote_id !== null && quote_id !== void 0 ? quote_id : study.quote_id,
                        fechaHora: fechaHora ? new Date(fechaHora) : study.fechaHora,
                        prioridad: prioridadFinal,
                        motivo: motivo !== null && motivo !== void 0 ? motivo : study.motivo,
                        status: status !== null && status !== void 0 ? status : study.status,
                        modalidad: modalidadNombre,
                        equipo: equipoNombre,
                        medico: medicoNombre,
                        tecnologo: tecnologoNombre,
                    }, { transaction });
                    if (Array.isArray(labels)) {
                        const existing = yield Label_1.Label.findAll({ where: { id: labels } });
                        const ids = existing.map(l => l.id);
                        yield study.setLabels(ids, { transaction });
                    }
                    yield transaction.commit();
                    const updated = yield Studie_1.Study.findByPk(pk, { include: STUDY_INCLUDE });
                    return res.status(200).json({ study: updated });
                }
                catch (error) {
                    yield transaction.rollback();
                    throw error;
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error updating study" });
            }
        });
    }
    deleteStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const study = yield Studie_1.Study.findByPk(pk);
                if (!study)
                    return res.status(404).json({ error: "Study not found" });
                yield study.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Study marked as INACTIVE" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting study" });
            }
        });
    }
}
exports.StudyController = StudyController;
//# sourceMappingURL=studie.controller.js.map