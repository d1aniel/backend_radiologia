import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/authorization/RefreshToken";
import { User } from "../models/authorization/User";
import { Role } from "../models/authorization/Role";
import { ResourceRole } from "../models/authorization/ResourceRole";
import { Resource } from "../models/authorization/Resource";
import { RoleUser } from "../models/authorization/RoleUser";
import { pathToRegexp } from "path-to-regexp";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
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
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as jwt.JwtPayload;

    
    const user: User | null = await User.findOne({ where: { id: decoded.id, is_active: true } });
    if (!user) {
      res.status(401).json({ error: "Usuario no encontrado o inactivo." });
      return;
    }

    
    const lastRefreshToken = await RefreshToken.findOne({
      where: { user_id: user.id },
      order: [["created_at", "DESC"]], 
    });

    if (!lastRefreshToken) {
      res.status(401).json({ error: "No se encontró un refresh token válido." });
      return;
    }

    
    if (lastRefreshToken.expires_at < new Date()) {
      
      const { token: newRefreshToken, expiresAt } = user.generateRefreshToken();

      
      await RefreshToken.create({
        user_id: user.id,
        token: newRefreshToken,
        device_info: req.headers["user-agent"] || "unknown",
        is_valid: true,
        expires_at: expiresAt,
      });

      
      await lastRefreshToken.update({ is_valid: false });

      
      res.setHeader("x-reset-token", newRefreshToken);
    }

    
    const isAuthorized = await validateAuthorization(decoded.id, currentRoute, currentMethod);
    if (!isAuthorized) {
      res.status(403).json({ error: "No está autorizado para ejecutar esta petición." });
      return;
    }

    
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({ error: "El token principal ha expirado." });
    } else if (error.name === "JsonWebTokenError") {
      res.status(401).json({ error: "Token inválido." });
    } else {
      res.status(500).json({ error: "Error interno del servidor.", details: error.message });
    }
  }
};



export const validateAuthorization = async (userId: number, resourcePath: string, resourceMethod: string): Promise<boolean> => {
  try {
    
    const resources = await Resource.findAll({
      where: { method: resourceMethod, is_active: "ACTIVE" },
    });

    
    const matchingResource = resources.find((resource) => {
      const { regexp } = pathToRegexp(resource.path);
      return regexp.test(resourcePath);
    });

    if (!matchingResource) {
      return false; 
    }

    
    const resourceRole = await ResourceRole.findOne({
      include: [
        {
          model: Role,
          include: [
            {
              model: RoleUser,
              where: { user_id: userId, is_active: "ACTIVE" }, 
            },
          ],
          where: { is_active: "ACTIVE" }, 
        },
      ],
      where: { resource_id: matchingResource.id, is_active: "ACTIVE" }, 
    });

    return !!resourceRole; 
  } catch (error) {
    console.error("Error al validar la autorización:", error);
    return false;
  }
};
