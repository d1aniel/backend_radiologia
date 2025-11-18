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
exports.DoctorController = void 0;
const Doctor_1 = require("../models/Doctor");
class DoctorController {
    getAllDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield Doctor_1.Doctor.findAll({
                    where: { status: "ACTIVATE" },
                });
                res.status(200).json({ doctors });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching doctors" });
            }
        });
    }
    getDoctorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const doctor = yield Doctor_1.Doctor.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (doctor) {
                    res.status(200).json({ doctor });
                }
                else {
                    res.status(404).json({ error: "Doctor not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching doctor" });
            }
        });
    }
    createDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { nombre, especialidad, telefono, correo, registro, status } = req.body;
            try {
                const body = {
                    nombre,
                    especialidad,
                    telefono: String(telefono),
                    correo,
                    registro: registro || null,
                    status: "ACTIVATE",
                };
                const newDoctor = yield Doctor_1.Doctor.create(Object.assign({}, body));
                res.status(201).json(newDoctor);
            }
            catch (error) {
                console.error(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(409).json({ error: "Correo ya registrado" });
                }
                if (error.name === "SequelizeValidationError") {
                    const messages = ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message)) || error.message;
                    return res.status(400).json({ error: messages });
                }
                res.status(400).json({ error: error.message || "Error creating doctor" });
            }
        });
    }
    updateDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { id: pk } = req.params;
            const { nombre, especialidad, telefono, correo, registro, status } = req.body;
            try {
                const body = {};
                if (nombre !== undefined)
                    body.nombre = nombre;
                if (especialidad !== undefined)
                    body.especialidad = especialidad;
                if (telefono !== undefined)
                    body.telefono = String(telefono);
                if (correo !== undefined)
                    body.correo = correo;
                if (registro !== undefined)
                    body.registro = registro;
                if (status !== undefined)
                    body.status = status;
                const doctorExist = yield Doctor_1.Doctor.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (doctorExist) {
                    yield doctorExist.update(body, { where: { id: pk } });
                    res.status(200).json(doctorExist);
                }
                else {
                    res.status(404).json({ error: "Doctor not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                if (error.name === "SequelizeUniqueConstraintError") {
                    return res.status(409).json({ error: "Correo ya registrado" });
                }
                if (error.name === "SequelizeValidationError") {
                    const messages = ((_a = error.errors) === null || _a === void 0 ? void 0 : _a.map((e) => e.message)) || error.message;
                    return res.status(400).json({ error: messages });
                }
                res.status(400).json({ error: error.message || "Error updating doctor" });
            }
        });
    }
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const doctorToDelete = yield Doctor_1.Doctor.findByPk(id);
                if (doctorToDelete) {
                    yield doctorToDelete.destroy();
                    res.status(200).json({ message: "Doctor deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Doctor not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting doctor" });
            }
        });
    }
    deleteDoctorAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const doctorToUpdate = yield Doctor_1.Doctor.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (doctorToUpdate) {
                    yield doctorToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Doctor marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Doctor not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error marking doctor as inactive" });
            }
        });
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctor.controller.js.map