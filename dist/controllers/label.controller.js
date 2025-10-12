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
exports.LabelController = void 0;
const Label_1 = require("../models/Label");
class LabelController {
    // Obtener todas las etiquetas activas
    getAllLabels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const labels = yield Label_1.Label.findAll({
                    where: { status: "ACTIVATE" },
                });
                res.status(200).json({ labels });
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching labels" });
            }
        });
    }
    // Obtener una etiqueta por ID
    getLabelById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const label = yield Label_1.Label.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (label) {
                    res.status(200).json(label);
                }
                else {
                    res.status(404).json({ error: "Label not found or inactive" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error fetching label" });
            }
        });
    }
    // Crear una nueva etiqueta
    createLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const body = req.body;
                const label = yield Label_1.Label.create(body);
                res.status(201).json(label);
            }
            catch (error) {
                res.status(500).json({ error: "Error creating label" });
            }
        });
    }
    // Actualizar una etiqueta por ID
    updateLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const body = req.body;
                const label = yield Label_1.Label.findByPk(pk);
                if (!label) {
                    return res.status(404).json({ error: "Label not found" });
                }
                yield label.update(body);
                res.status(200).json(label);
            }
            catch (error) {
                res.status(500).json({ error: "Error updating label" });
            }
        });
    }
    // Eliminar (cambiar status a INACTIVE)
    deleteLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const label = yield Label_1.Label.findByPk(pk);
                if (!label) {
                    return res.status(404).json({ error: "Label not found" });
                }
                yield label.update({ status: "INACTIVE" });
                res.status(200).json({ message: "Label set to INACTIVE" });
            }
            catch (error) {
                res.status(500).json({ error: "Error deleting label" });
            }
        });
    }
}
exports.LabelController = LabelController;
//# sourceMappingURL=label.controller.js.map