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
exports.validateAuthorization = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RefreshToken_1 = require("../models/authorization/RefreshToken");
const User_1 = require("../models/authorization/User");
const Role_1 = require("../models/authorization/Role");
const ResourceRole_1 = require("../models/authorization/ResourceRole");
const Resource_1 = require("../models/authorization/Resource");
const RoleUser_1 = require("../models/authorization/RoleUser");
const path_to_regexp_1 = require("path-to-regexp");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    const refresh_token = req.header("x-reset-token");
    const currentRoute = req.originalUrl;
    const currentMethod = req.method;
    if (!token) {
        res
            .status(401)
            .json({ error: "Acceso denegado: No se proporcionó el token principal." });
        return;
    }
    try {
        // Verificar si el token principal es válido
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        // Buscar el usuario en la base de datos
        const user = yield User_1.User.findOne({ where: { id: decoded.id, is_active: true } });
        if (!user) {
            res.status(401).json({ error: "Usuario no encontrado o inactivo." });
            return;
        }
        // Obtener el último registro de refresh_token para este usuario
        const lastRefreshToken = yield RefreshToken_1.RefreshToken.findOne({
            where: { user_id: user.id },
            order: [["created_at", "DESC"]], // Ordenar por fecha de creación descendente
        });
        if (!lastRefreshToken) {
            res.status(401).json({ error: "No se encontró un refresh token válido." });
            return;
        }
        // Verificar si el último refresh_token ha expirado
        if (lastRefreshToken.expires_at < new Date()) {
            // El refresh_token ha expirado, generar uno nuevo
            const { token: newRefreshToken, expiresAt } = user.generateRefreshToken();
            // Crear un nuevo registro en la tabla refresh_tokens
            yield RefreshToken_1.RefreshToken.create({
                user_id: user.id,
                token: newRefreshToken,
                device_info: req.headers["user-agent"] || "unknown",
                is_valid: true,
                expires_at: expiresAt,
            });
            // Invalidar el refresh_token anterior
            yield lastRefreshToken.update({ is_valid: false });
            // Enviar el nuevo refresh_token en el encabezado
            res.setHeader("x-reset-token", newRefreshToken);
        }
        // Validar autorización
        const isAuthorized = yield (0, exports.validateAuthorization)(decoded.id, currentRoute, currentMethod);
        if (!isAuthorized) {
            res.status(403).json({ error: "No está autorizado para ejecutar esta petición." });
            return;
        }
        // Continuar con la solicitud
        next();
    }
    catch (error) {
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ error: "El token principal ha expirado." });
        }
        else if (error.name === "JsonWebTokenError") {
            res.status(401).json({ error: "Token inválido." });
        }
        else {
            res.status(500).json({ error: "Error interno del servidor.", details: error.message });
        }
    }
});
exports.authMiddleware = authMiddleware;
const validateAuthorization = (userId, resourcePath, resourceMethod) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Obtener todos los recursos activos que coincidan con el método
        const resources = yield Resource_1.Resource.findAll({
            where: { method: resourceMethod, is_active: "ACTIVE" },
        });
        // Convertir las rutas dinámicas a expresiones regulares y buscar coincidencias
        const matchingResource = resources.find((resource) => {
            const { regexp } = (0, path_to_regexp_1.pathToRegexp)(resource.path);
            return regexp.test(resourcePath);
        });
        if (!matchingResource) {
            return false; // No hay coincidencias para la ruta y el método
        }
        // Verificar si existe una relación válida entre el usuario, su rol y el recurso solicitado
        const resourceRole = yield ResourceRole_1.ResourceRole.findOne({
            include: [
                {
                    model: Role_1.Role,
                    include: [
                        {
                            model: RoleUser_1.RoleUser,
                            where: { user_id: userId, is_active: "ACTIVE" }, // Validar que el usuario esté asociado al rol
                        },
                    ],
                    where: { is_active: "ACTIVE" }, // Validar que el rol esté activo
                },
            ],
            where: { resource_id: matchingResource.id, is_active: "ACTIVE" }, // Validar que la relación resource_role esté activa
        });
        return !!resourceRole; // Retorna true si se encuentra un registro coincidente
    }
    catch (error) {
        console.error("Error al validar la autorización:", error);
        return false;
    }
});
exports.validateAuthorization = validateAuthorization;
//# sourceMappingURL=auth.js.map