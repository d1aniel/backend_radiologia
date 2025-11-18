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
exports.RoleUserController = void 0;
const RoleUser_1 = require("../models/authorization/RoleUser");
class RoleUserController {
    getAllRoleUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roleUsers = yield RoleUser_1.RoleUser.findAll();
                res.status(200).json({ roleUsers });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener los usuarios de roles' });
            }
        });
    }
    getRoleUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const roleUser = yield RoleUser_1.RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
                if (roleUser) {
                    res.status(200).json(roleUser);
                }
                else {
                    res.status(404).json({ error: 'RoleUser no encontrado o inactivo' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener el RoleUser' });
            }
        });
    }
    createRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { role_id, user_id, is_active } = req.body;
            try {
                const newRoleUser = yield RoleUser_1.RoleUser.create({ role_id, user_id, is_active });
                res.status(201).json(newRoleUser);
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    updateRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { role_id, user_id, is_active } = req.body;
            try {
                const roleUser = yield RoleUser_1.RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
                if (roleUser) {
                    yield roleUser.update({ role_id, user_id, is_active });
                    res.status(200).json(roleUser);
                }
                else {
                    res.status(404).json({ error: 'RoleUser no encontrado o inactivo' });
                }
            }
            catch (error) {
                res.status(400).json({ error: error.message });
            }
        });
    }
    deleteRoleUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const roleUser = yield RoleUser_1.RoleUser.findByPk(id);
                if (roleUser) {
                    yield roleUser.destroy();
                    res.status(200).json({ message: 'RoleUser eliminado correctamente' });
                }
                else {
                    res.status(404).json({ error: 'RoleUser no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el RoleUser' });
            }
        });
    }
    deleteRoleUserAdv(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const roleUser = yield RoleUser_1.RoleUser.findOne({ where: { id, is_active: "ACTIVE" } });
                if (roleUser) {
                    yield roleUser.update({ is_active: "INACTIVE" });
                    res.status(200).json({ message: 'RoleUser marcado como inactivo' });
                }
                else {
                    res.status(404).json({ error: 'RoleUser no encontrado' });
                }
            }
            catch (error) {
                res.status(500).json({ error: 'Error al marcar el RoleUser como inactivo' });
            }
        });
    }
}
exports.RoleUserController = RoleUserController;
//# sourceMappingURL=role_user.controller.js.map