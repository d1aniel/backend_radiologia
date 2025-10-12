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
exports.ResourceRoleController = void 0;
const ResourceRole_1 = require("../models/authorization/ResourceRole");
class ResourceRoleController {
    // Obtener todos los ResourceRoles
    getAllResourceRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resourceRoles = yield ResourceRole_1.ResourceRole.findAll({
                    where: { is_active: "ACTIVE" },
                });
                res.status(200).json({ resourceRoles });
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener los ResourceRoles" });
            }
        });
    }
    // Obtener un ResourceRole por ID
    getResourceRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resourceRole = yield ResourceRole_1.ResourceRole.findOne({
                    where: { id, is_active: "ACTIVE" },
                });
                if (resourceRole) {
                    res.status(200).json(resourceRole);
                }
                else {
                    res.status(404).json({ error: "ResourceRole no encontrado o inactivo" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al obtener el ResourceRole" });
            }
        });
    }
    // Crear un nuevo ResourceRole
    createResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { resource_id, role_id, is_active } = req.body;
            try {
                const newResourceRole = yield ResourceRole_1.ResourceRole.create({ resource_id, role_id, is_active });
                res.status(201).json(newResourceRole);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Actualizar un ResourceRole
    updateResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { resource_id, role_id, is_active } = req.body;
            try {
                const resourceRole = yield ResourceRole_1.ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
                if (resourceRole) {
                    yield resourceRole.update({ resource_id, role_id, is_active });
                    res.status(200).json(resourceRole);
                }
                else {
                    res.status(404).json({ error: "ResourceRole no encontrado o inactivo" });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Eliminar un ResourceRole físicamente
    deleteResourceRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resourceRole = yield ResourceRole_1.ResourceRole.findByPk(id);
                if (resourceRole) {
                    yield resourceRole.destroy();
                    res.status(200).json({ message: "ResourceRole eliminado correctamente" });
                }
                else {
                    res.status(404).json({ error: "ResourceRole no encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al eliminar el ResourceRole" });
            }
        });
    }
    // Eliminar un ResourceRole lógicamente
    deleteResourceRoleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const resourceRole = yield ResourceRole_1.ResourceRole.findOne({ where: { id, is_active: "ACTIVE" } });
                if (resourceRole) {
                    yield resourceRole.update({ is_active: "INACTIVE" });
                    res.status(200).json({ message: "ResourceRole marcado como inactivo" });
                }
                else {
                    res.status(404).json({ error: "ResourceRole no encontrado" });
                }
            }
            catch (error) {
                res.status(500).json({ error: "Error al marcar el ResourceRole como inactivo" });
            }
        });
    }
}
exports.ResourceRoleController = ResourceRoleController;
//# sourceMappingURL=resourceRole.controller.js.map