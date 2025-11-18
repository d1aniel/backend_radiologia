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
    getAllLabels(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const labels = yield Label_1.Label.findAll({
                    where: { status: "ACTIVATE" },
                });
                res.status(200).json({ labels });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching labels" });
            }
        });
    }
    getLabelById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const label = yield Label_1.Label.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (label) {
                    res.status(200).json({ label });
                }
                else {
                    res.status(404).json({ error: "Label not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error fetching label" });
            }
        });
    }
    createLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, descripcion, status } = req.body;
            try {
                const body = {
                    nombre,
                    descripcion,
                    status,
                };
                const newLabel = yield Label_1.Label.create(Object.assign({}, body));
                res.status(201).json(newLabel);
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message || "Error creating label" });
            }
        });
    }
    updateLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id: pk } = req.params;
            const { nombre, descripcion, status } = req.body;
            try {
                const body = {
                    nombre,
                    descripcion,
                    status,
                };
                const labelExist = yield Label_1.Label.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (labelExist) {
                    yield labelExist.update(body, { where: { id: pk } });
                    res.status(200).json(labelExist);
                }
                else {
                    res.status(404).json({ error: "Label not found or inactive" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteLabel(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const labelToDelete = yield Label_1.Label.findByPk(id);
                if (labelToDelete) {
                    yield labelToDelete.destroy();
                    res.status(200).json({ message: "Label deleted successfully" });
                }
                else {
                    res.status(404).json({ error: "Label not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error deleting label" });
            }
        });
    }
    deleteLabelAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id: pk } = req.params;
                const labelToUpdate = yield Label_1.Label.findOne({
                    where: { id: pk, status: "ACTIVATE" },
                });
                if (labelToUpdate) {
                    yield labelToUpdate.update({ status: "INACTIVE" });
                    res.status(200).json({ message: "Label marked as inactive" });
                }
                else {
                    res.status(404).json({ error: "Label not found" });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ error: "Error marking label as inactive" });
            }
        });
    }
}
exports.LabelController = LabelController;
//# sourceMappingURL=label.controller.js.map