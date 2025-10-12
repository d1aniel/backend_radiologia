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
exports.ResourceController = void 0;
const Resource_1 = require("../models/authorization/Resource");
class ResourceController {
    // Obtener todos los recursos
    getAllResources(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resources = yield Resource_1.Resource.findAll({
                    where: { is_active: "ACTIVE" },
                });
                res.status(200).json({ resources });
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener los recursos" });
            }
        });
    }
    // Obtener un recurso por ID
    getResourceById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resource = yield Resource_1.Resource.findOne({
                    where: { id, is_active: "ACTIVE" },
                });
                if (resource) {
                    res.status(200).json(resource);
                }
                else {
                    res.status(404).json({ error: "Recurso no encontrado o inactivo" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener el recurso" });
            }
        });
    }
    // Crear un nuevo recurso
    createResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { path, method, is_active } = req.body;
            try {
                const newResource = yield Resource_1.Resource.create({ path, method, is_active });
                res.status(201).json(newResource);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Actualizar un recurso
    updateResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { path, method, is_active } = req.body;
            try {
                const resource = yield Resource_1.Resource.findOne({ where: { id, is_active: "ACTIVE" } });
                if (resource) {
                    yield resource.update({ path, method, is_active });
                    res.status(200).json(resource);
                }
                else {
                    res.status(404).json({ error: "Recurso no encontrado o inactivo" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Eliminar un recurso físicamente
    deleteResource(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resource = yield Resource_1.Resource.findByPk(id);
                if (resource) {
                    yield resource.destroy();
                    res.status(200).json({ message: "Recurso eliminado correctamente" });
                }
                else {
                    res.status(404).json({ error: "Recurso no encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al eliminar el recurso" });
            }
        });
    }
    // Eliminar un recurso lógicamente
    deleteResourceAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resource = yield Resource_1.Resource.findOne({ where: { id, is_active: "ACTIVE" } });
                if (resource) {
                    yield resource.update({ is_active: "INACTIVE" });
                    res.status(200).json({ message: "Recurso marcado como inactivo" });
                }
                else {
                    res.status(404).json({ error: "Recurso no encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al marcar el recurso como inactivo" });
            }
        });
    }
}
exports.ResourceController = ResourceController;
//# sourceMappingURL=resource.controller.js.map