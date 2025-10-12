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
exports.PatientController = void 0;
const Pacient_1 = require("../models/Pacient");
class PatientController {
    // Obtener todos los pacientes activos
    getAllPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield Pacient_1.Patient.findAll({
                    where: { status: "ACTIVATE" },
                });
                res.status(200).json({ patients });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching patients" });
            }
        });
    }
    // Obtener un paciente por ID
    getPatientById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const patient = yield Pacient_1.Patient.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (patient) {
                    res.status(200).json(patient);
                }
                else {
                    res.status(404).json({ error: "Patient not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching patient" });
            }
        });
    }
    // Crear un nuevo paciente
    createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const patient = yield Pacient_1.Patient.create(body);
                res.status(201).json(patient);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating patient" });
            }
        });
    }
    // Actualizar un paciente por ID
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const patient = yield Pacient_1.Patient.findByPk(pk);
                if (!patient) {
                    return res.status(404).json({ error: "Patient not found" });
                }
                yield patient.update(body);
                res.status(200).json(patient);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating patient" });
            }
        });
    }
    // Eliminar (cambiar status a INACTIVE)
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const patient = yield Pacient_1.Patient.findByPk(pk);
                if (!patient) {
                    return res.status(404).json({ error: "Patient not found" });
                }
                yield patient.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Patient set to INACTIVE" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting patient" });
            }
        });
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=pacient.controller.js.map