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
exports.RoleController = void 0;
const Role_1 = require("../models/authorization/Role");
class RoleController {
    // Obtener todos los roles
    getAllRoles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield Role_1.Role.findAll();
                res.status(200).json({ roles });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los roles' });
            }
        });
    }
    // Obtener un rol por ID
    getRoleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const role = yield Role_1.Role.findOne({ where: { id, is_active: "ACTIVE" } });
                if (role) {
                    res.status(200).json(role);
                }
                else {
                    res.status(404).json({ error: 'Rol no encontrado o inactivo' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener el rol' });
            }
        });
    }
    // Crear un nuevo rol
    createRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, is_active } = req.body;
            try {
                const newRole = yield Role_1.Role.create({ name, is_active });
                res.status(201).json(newRole);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Actualizar un rol
    updateRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, is_active } = req.body;
            try {
                const role = yield Role_1.Role.findOne({ where: { id, is_active: "ACTIVE" } });
                if (role) {
                    yield role.update({ name, is_active });
                    res.status(200).json(role);
                }
                else {
                    res.status(404).json({ error: 'Rol no encontrado o inactivo' });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    // Eliminar un rol físicamente
    deleteRole(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const role = yield Role_1.Role.findByPk(id);
                if (role) {
                    yield role.destroy();
                    res.status(200).json({ message: 'Rol eliminado correctamente' });
                }
                else {
                    res.status(404).json({ error: 'Rol no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el rol' });
            }
        });
    }
    // Eliminar un rol lógicamente
    deleteRoleAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const role = yield Role_1.Role.findOne({ where: { id, is_active: "ACTIVE" } });
                if (role) {
                    yield role.update({ is_active: "INACTIVE" });
                    res.status(200).json({ message: 'Rol marcado como inactivo' });
                }
                else {
                    res.status(404).json({ error: 'Rol no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al marcar el rol como inactivo' });
            }
        });
    }
}
exports.RoleController = RoleController;
//# sourceMappingURL=role.controller.js.map