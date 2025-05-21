import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwtHelpers';

export function protect(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  const token = auth.split(' ')[1];
  try {
    const decoded = verifyToken(token) as any;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
} 