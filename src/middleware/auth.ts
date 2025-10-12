import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RefreshToken } from '../models/authorization/RefreshToken';
import { User } from '../models/authorization/User';


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  const currentRoute = req.originalUrl;
  const currentMethod = req.method;

  console.log(currentRoute)
  if (!token) {
    res.status(401).json({ error: 'Acceso denegado: No se proporcionó el token principal.' });
    return;
  }

  try {
    // Verificar si el token principal es válido
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as jwt.JwtPayload;

    // Buscar el usuario en la base de datos
    const user: User | null = await User.findOne({ where: { id: decoded.id, is_active: 'ACTIVE' } });
    if (!user) {
      res.status(401).json({ error: 'Usuario no encontrado o inactivo.' });
      return;
    }


    // Continuar con la solicitud
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'El token principal ha expirado.' });
    } else if (error.name === 'JsonWebTokenError') {
      res.status(401).json({ error: 'Token inválido.' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
    }
  }
};