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
    getAllModalidades(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const modalidades = yield Modalitie_1.Modalidad.findAll({
                    where: { activa: true },
                });
                return res.status(200).json({ modalidades });
            }
            catch (error) {
                console.error("[getAllModalidades] ", error);
                return res.status(500).json({ error: "Error fetching modalidades" });
            }
        });
    }
    getModalidadById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const modalidad = yield Modalitie_1.Modalidad.findOne({
                    where: { id, activa: true },
                });
                if (modalidad) {
                    return res.status(200).json({ modalidad });
                }
                else {
                    return res.status(404).json({ error: "Modalidad not found or inactive" });
                }
            }
            catch (error) {
                console.error("[getModalidadById] ", error);
                return res.status(500).json({ error: "Error fetching modalidad" });
            }
        });
    }
    createModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { nombre, descripcion, activa } = req.body;
                if (!nombre || String(nombre).trim().length < 2) {
                    return res.status(400).json({ error: "Nombre es obligatorio (mín 2 caracteres)" });
                }
                if (!descripcion || String(descripcion).trim().length < 5) {
                    return res.status(400).json({ error: "Descripción es obligatoria (mín 5 caracteres)" });
                }
                const body = {
                    nombre: String(nombre).trim(),
                    descripcion: String(descripcion).trim(),
                    activa: typeof activa === "boolean" ? activa : true
                };
                const modalidad = yield Modalitie_1.Modalidad.create(body);
                return res.status(201).json({ modalidad });
            }
            catch (error) {
                console.error("[createModalidad] ", error);
                return res.status(400).json({ error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : "Error creating modalidad" });
            }
        });
    }
    updateModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const body = req.body;
                const modalidad = yield Modalitie_1.Modalidad.findByPk(id);
                if (!modalidad)
                    return res.status(404).json({ error: "Modalidad not found" });
                if (body.nombre && String(body.nombre).trim().length < 2) {
                    return res.status(400).json({ error: "Nombre inválido (mín 2 caracteres)" });
                }
                if (body.descripcion && String(body.descripcion).trim().length < 5) {
                    return res.status(400).json({ error: "Descripción inválida (mín 5 caracteres)" });
                }
                yield modalidad.update(Object.assign(Object.assign(Object.assign({}, (body.nombre !== undefined ? { nombre: String(body.nombre).trim() } : {})), (body.descripcion !== undefined ? { descripcion: String(body.descripcion).trim() } : {})), (body.activa !== undefined ? { activa: Boolean(body.activa) } : {})));
                return res.status(200).json({ modalidad });
            }
            catch (error) {
                console.error("[updateModalidad] ", error);
                return res.status(500).json({ error: "Error updating modalidad" });
            }
        });
    }
    deleteModalidad(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const modalidad = yield Modalitie_1.Modalidad.findByPk(id);
                if (!modalidad)
                    return res.status(404).json({ error: "Modalidad not found" });
                yield modalidad.update({ activa: false });
                return res.status(200).json({ message: "Modalidad marked as inactive" });
            }
            catch (error) {
                console.error("[deleteModalidad] ", error);
                return res.status(500).json({ error: "Error deleting modalidad" });
            }
        });
    }
    deleteModalidadAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = Number(req.params.id);
                if (Number.isNaN(id))
                    return res.status(400).json({ error: "Invalid id" });
                const modalidad = yield Modalitie_1.Modalidad.findOne({ where: { id, activa: true } });
                if (!modalidad)
                    return res.status(404).json({ error: "Modalidad not found or already inactive" });
                yield modalidad.update({ activa: false });
                return res.status(200).json({ message: "Modalidad marked as inactive" });
            }
            catch (error) {
                console.error("[deleteModalidadAdv] ", error);
                return res.status(500).json({ error: "Error marking modalidad as inactive" });
            }
        });
    }
}
exports.ModalidadController = ModalidadController;
//# sourceMappingURL=modalitie.controller.js.map