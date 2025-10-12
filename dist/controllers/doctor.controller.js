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
exports.DoctorController = void 0;
const Doctor_1 = __importDefault(require("../models/Doctor"));
const sequelize_1 = require("sequelize");
class DoctorController {
    constructor() {
        /**
         * GET /api/doctors
         * List all doctors
         */
        this.getAllDoctors = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const doctors = yield Doctor_1.default.findAll();
                return res.status(200).json({ ok: true, data: doctors });
            }
            catch (error) {
                console.error('getAllDoctors error:', error);
                return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
            }
        });
        /**
         * GET /api/doctors/:id
         * Get one doctor by id
         */
        this.getDoctorById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const doctor = yield Doctor_1.default.findByPk(id);
                if (!doctor) {
                    return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
                }
                return res.status(200).json({ ok: true, data: doctor });
            }
            catch (error) {
                console.error('getDoctorById error:', error);
                return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
            }
        });
        /**
         * POST /api/doctors
         * Create a doctor
         * Body: { nombre, especialidad, telefono, correo, registro? }
         * status se establece por defecto a "ACTIVATE"
         */
        this.createDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { nombre, especialidad, telefono, correo, registro } = req.body;
            // validación simple del servidor (complementar con express-validator si quieres)
            if (!nombre || !especialidad || !telefono || !correo) {
                return res.status(400).json({ ok: false, message: 'Faltan campos requeridos' });
            }
            try {
                const nuevo = yield Doctor_1.default.create({
                    nombre,
                    especialidad,
                    telefono: String(telefono),
                    correo,
                    registro: registro || null,
                    // status default ya definido en el modelo, pero lo podemos forzar:
                    status: 'ACTIVATE'
                });
                return res.status(201).json({ ok: true, data: nuevo });
            }
            catch (err) {
                console.error('createDoctor error:', err);
                if (err instanceof sequelize_1.UniqueConstraintError) {
                    // por ejemplo: correo duplicado
                    return res.status(409).json({ ok: false, message: 'Correo ya registrado' });
                }
                if (err instanceof sequelize_1.ValidationError) {
                    return res.status(400).json({ ok: false, message: err.errors.map(e => e.message) });
                }
                return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
            }
        });
        /**
         * PUT /api/doctors/:id
         * Update doctor (puedes actualizar nombre, especialidad, telefono, correo, registro, status)
         */
        this.updateDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, especialidad, telefono, correo, registro, status } = req.body;
            try {
                const doctor = yield Doctor_1.default.findByPk(id);
                if (!doctor) {
                    return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
                }
                // actualizar solo los campos presentes
                if (nombre !== undefined)
                    doctor.nombre = nombre;
                if (especialidad !== undefined)
                    doctor.especialidad = especialidad;
                if (telefono !== undefined)
                    doctor.telefono = String(telefono);
                if (correo !== undefined)
                    doctor.correo = correo;
                if (registro !== undefined)
                    doctor.registro = registro;
                if (status !== undefined)
                    doctor.status = status;
                yield doctor.save();
                return res.status(200).json({ ok: true, data: doctor });
            }
            catch (err) {
                console.error('updateDoctor error:', err);
                if (err instanceof sequelize_1.UniqueConstraintError) {
                    return res.status(409).json({ ok: false, message: 'Correo ya registrado' });
                }
                if (err instanceof sequelize_1.ValidationError) {
                    return res.status(400).json({ ok: false, message: err.errors.map(e => e.message) });
                }
                return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
            }
        });
        /**
         * DELETE /api/doctors/:id
         * Hard delete (si prefieres soft delete, cambia a update status = INACTIVE)
         */
        this.deleteDoctor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const doctor = yield Doctor_1.default.findByPk(id);
                if (!doctor) {
                    return res.status(404).json({ ok: false, message: 'Doctor no encontrado' });
                }
                yield doctor.destroy();
                return res.status(200).json({ ok: true, message: 'Doctor eliminado' });
            }
            catch (error) {
                console.error('deleteDoctor error:', error);
                return res.status(500).json({ ok: false, message: 'Error interno del servidor' });
            }
        });
    }
}
exports.DoctorController = DoctorController;
//# sourceMappingURL=doctor.controller.js.map