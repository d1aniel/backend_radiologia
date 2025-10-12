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
exports.ModalidadController = void 0;
const Modalitie_1 = require("../models/Modalitie");
class ModalidadController {
    // Obtener todas las modalidades activas
    getAllModalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modalidades = yield Modalitie_1.Modalidad.findAll({
                    where: { activa: true },
                });
                res.status(200).json({ modalidades });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching modalidades" });
            }
        });
    }
    // Obtener modalidad por ID
    getModalidadById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const modalidad = yield Modalitie_1.Modalidad.findOne({
                    where: { id: pk, activa: true },
                });
                if (modalidad) {
                    res.status(200).json(modalidad);
                }
                else {
                    res.status(404).json({ error: "Modalidad not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching modalidad" });
            }
        });
    }
    // Crear nueva modalidad
    createModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const modalidad = yield Modalitie_1.Modalidad.create(body);
                res.status(201).json(modalidad);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating modalidad" });
            }
        });
    }
    // Actualizar modalidad por ID
    updateModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const modalidad = yield Modalitie_1.Modalidad.findByPk(pk);
                if (!modalidad) {
                    return res.status(404).json({ error: "Modalidad not found" });
                }
                yield modalidad.update(body);
                res.status(200).json(modalidad);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating modalidad" });
            }
        });
    }
    // Eliminar (cambiar activa a false)
    deleteModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const modalidad = yield Modalitie_1.Modalidad.findByPk(pk);
                if (!modalidad) {
                    return res.status(404).json({ error: "Modalidad not found" });
                }
                yield modalidad.update({ activa: false });
                res.status(200).json({ message: "Modalidad set to INACTIVE" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting modalidad" });
            }
        });
    }
}
exports.ModalidadController = ModalidadController;
//# sourceMappingURL=modalitie.controller.js.map