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
exports.StudyController = void 0;
const Studie_1 = require("../models/Studie");
const Pacient_1 = require("../models/Pacient");
const Label_1 = require("../models/Label");
class StudyController {
    // Obtener todos los estudios activos (incluye paciente, labels, imagenes)
    getAllStudies(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const studies = yield Studie_1.Study.findAll({
                    where: { status: "ACTIVE" },
                    include: [
                        { model: Pacient_1.Patient, as: "patient" }, // si en tu modelo la alias es distinto ajústalo
                        { model: Label_1.Label, as: "labels" }, // incluir etiquetas asociadas
                        // { model: Image, as: 'imagenes' }   // si quieres imágenes inclúyelo
                    ],
                });
                res.status(200).json({ studies });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching studies" });
            }
        });
    }
    // Obtener un estudio por ID
    getStudyById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const study = yield Studie_1.Study.findOne({
                    where: { id: pk, status: "ACTIVE" },
                    include: [
                        { model: Pacient_1.Patient, as: "patient" },
                        { model: Label_1.Label, as: "labels" },
                        // { model: Image, as: 'imagenes' }
                    ],
                });
                if (study) {
                    res.status(200).json(study);
                }
                else {
                    res.status(404).json({ error: "Study not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching study" });
            }
        });
    }
    // Crear un nuevo estudio
    // body esperado: StudyI fields (patient_id, modalidad, equipo, fechaHora (ISO), prioridad, motivo, tecnologo?, medico?) 
    // opcional: labels: number[] (IDs de etiquetas)
    createStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                const body = req.body;
                // Validación básica: patient_id debe existir y paciente activo
                if (!body.patient_id) {
                    return res.status(400).json({ error: "patient_id is required" });
                }
                const patient = yield Pacient_1.Patient.findOne({ where: { id: body.patient_id, status: "ACTIVE" } });
                if (!patient) {
                    return res.status(400).json({ error: "Patient not found or inactive" });
                }
                // crea el estudio (si fechaHora viene como string ISO, Sequelize lo acepta o conviértelo)
                const studyPayload = {
                    patient_id: body.patient_id,
                    modalidad: body.modalidad,
                    equipo: body.equipo,
                    tecnologo: (_a = body.tecnologo) !== null && _a !== void 0 ? _a : null,
                    medico: (_b = body.medico) !== null && _b !== void 0 ? _b : null,
                    fechaHora: body.fechaHora ? new Date(body.fechaHora) : new Date(),
                    prioridad: ((_c = body.prioridad) !== null && _c !== void 0 ? _c : "MEDIA"),
                    motivo: body.motivo,
                    status: "ACTIVE",
                };
                const newStudy = yield Studie_1.Study.create(studyPayload);
                // Si vienen etiquetas (labels) asociarlas (reemplaza las existentes)
                if (Array.isArray(body.labels) && body.labels.length > 0) {
                    // labels deben existir: opcional validación
                    const existingLabels = yield Label_1.Label.findAll({ where: { id: body.labels } });
                    const existingIds = existingLabels.map(l => l.id);
                    // Usa el alias de la asociación: en tu modelo definiste as: 'labels'
                    // si se usa 'etiquetas' ajusta a esa clave
                    yield newStudy.$set("labels", existingIds);
                }
                // Recupera el estudio creado con includes para retornar datos completos
                const created = yield Studie_1.Study.findByPk(newStudy.id, {
                    include: [
                        { model: Pacient_1.Patient, as: "patient" },
                        { model: Label_1.Label, as: "labels" },
                    ],
                });
                res.status(201).json(created);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error creating study" });
            }
        });
    }
    // Actualizar un estudio por ID (y opcionalmente reemplazar labels)
    updateStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const study = yield Studie_1.Study.findByPk(pk);
                if (!study) {
                    return res.status(404).json({ error: "Study not found" });
                }
                // Si se intenta cambiar patient_id validar existencia
                if (body.patient_id) {
                    const patient = yield Pacient_1.Patient.findOne({ where: { id: body.patient_id, status: "ACTIVE" } });
                    if (!patient) {
                        return res.status(400).json({ error: "Patient not found or inactive" });
                    }
                }
                // Actualizar campos permitidos
                yield study.update({
                    patient_id: (_a = body.patient_id) !== null && _a !== void 0 ? _a : study.patient_id,
                    modalidad: (_b = body.modalidad) !== null && _b !== void 0 ? _b : study.modalidad,
                    equipo: (_c = body.equipo) !== null && _c !== void 0 ? _c : study.equipo,
                    tecnologo: (_e = (_d = body.tecnologo) !== null && _d !== void 0 ? _d : study.tecnologo) !== null && _e !== void 0 ? _e : null,
                    medico: (_g = (_f = body.medico) !== null && _f !== void 0 ? _f : study.medico) !== null && _g !== void 0 ? _g : null,
                    fechaHora: body.fechaHora ? new Date(body.fechaHora) : study.fechaHora,
                    prioridad: ((_h = body.prioridad) !== null && _h !== void 0 ? _h : study.prioridad),
                    motivo: (_j = body.motivo) !== null && _j !== void 0 ? _j : study.motivo,
                });
                // Reemplazar etiquetas si vienen en el body
                if (Array.isArray(body.labels)) {
                    const existingLabels = yield Label_1.Label.findAll({ where: { id: body.labels } });
                    const existingIds = existingLabels.map(l => l.id);
                    yield study.$set("labels", existingIds);
                }
                const updated = yield Studie_1.Study.findByPk(pk, {
                    include: [
                        { model: Pacient_1.Patient, as: "patient" },
                        { model: Label_1.Label, as: "labels" },
                    ],
                });
                res.status(200).json(updated);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error updating study" });
            }
        });
    }
    // Eliminar estudio: marcar status = INACTIVE
    deleteStudy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const study = yield Studie_1.Study.findByPk(pk);
                if (!study) {
                    return res.status(404).json({ error: "Study not found" });
                }
                yield study.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Study set to INACTIVE" });
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