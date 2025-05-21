import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import { generateToken } from '../utils/jwtHelpers';
import passport from 'passport';
import { IUser } from '../models/User';

const authService = new AuthService();

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password_raw, firstName, lastName } = req.body;
    
    const result = await authService.register({
      email,
      password_raw,
      firstName,
      lastName
    });

    res.status(201).json(result);
  } catch (error: any) {
    if (error.message === 'User already exists') {
      res.status(409).json({ message: 'El email ya está registrado' });
    } else {
      console.error('Error en registro:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const result = await authService.login(email, password);
    res.json(result);
  } catch (error: any) {
    if (error.message === 'Invalid credentials') {
      res.status(401).json({ message: 'Credenciales inválidas' });
    } else {
      console.error('Error en login:', error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
};

export function loginPassport(req: Request, res: Response) {
  // Passport local ya pone el usuario en req.user
  const user = req.user as IUser;
  if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });
  const token = generateToken(user);
  res.json({ user, token });
} 