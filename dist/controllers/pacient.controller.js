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
    getAllPatients(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const patients = yield Pacient_1.Patient.findAll({
                    where: { status: "ACTIVATE" },
                });
                res.status(200).json(patients);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching patients" });
            }
        });
    }
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
                console.error(error);
                res.status(500).json({ error: "Error fetching patient" });
            }
        });
    }
    createPatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, apellido, tpdocumento, sexo, documento, telefono, eps, correo, status, } = req.body;
            try {
                const body = {
                    nombre,
                    apellido,
                    tpdocumento,
                    sexo,
                    documento,
                    telefono,
                    eps,
                    correo,
                    status,
                };
                const newPatient = yield Pacient_1.Patient.create(Object.assign({}, body));
                res.status(201).json(newPatient);
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        });
    }
    updatePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { nombre, apellido, tpdocumento, sexo, documento, telefono, eps, correo, status, } = req.body;
            try {
                const body = {
                    nombre,
                    apellido,
                    tpdocumento,
                    sexo,
                    documento,
                    telefono,
                    eps,
                    correo,
                    status,
                };
                const patientExist = yield Pacient_1.Patient.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (patientExist) {
                    yield patientExist.update(body, { where: { id: pk } });
                    res.status(200).json(patientExist);
                }
                else {
                    res.status(404).json({ error: "Patient not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        });
    }
    deletePatient(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const patientToDelete = yield Pacient_1.Patient.findByPk(id);
                if (patientToDelete) {
                    yield patientToDelete.destroy();
                    res.status(200).json({ message: "Patient deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Patient not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting patient" });
            }
        });
    }
    deletePatientAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const patientToUpdate = yield Pacient_1.Patient.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (patientToUpdate) {
                    yield patientToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Patient marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Patient not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error marking patient as inactive" });
            }
        });
    }
}
exports.PatientController = PatientController;
//# sourceMappingURL=pacient.controller.js.map