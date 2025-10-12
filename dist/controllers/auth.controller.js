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
exports.AuthController = void 0;
const User_1 = require("../models/authorization/User");
const RefreshToken_1 = require("../models/authorization/RefreshToken");
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, email, password, is_active, avatar } = req.body;
                const user_interface = yield User_1.User.create({ username, email, password, is_active, avatar });
                const token = user_interface.generateToken();
                // const refresh_token = user_interface.generateRefreshToken();
                res.status(201).json({ user_interface, token });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al registrar el usuario' });
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield User_1.User.findOne({
                    where: {
                        email,
                        is_active: true
                    }
                });
                if (!user || !(yield user.checkPassword(password))) {
                    res.status(401).json({ error: 'Credenciales inválidas' });
                    return;
                }
                const token = user.generateToken();
                const { token: refreshToken, expiresAt } = user.generateRefreshToken();
                // Crear un nuevo registro en RefreshToken
                yield RefreshToken_1.RefreshToken.create({
                    user_id: user.id,
                    token: refreshToken,
                    device_info: req.headers['user-agent'] || 'unknown',
                    is_valid: true,
                    expires_at: expiresAt
                });
                res.status(200).json({ user, token, refreshToken });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al iniciar sesión' });
            }
        });
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map