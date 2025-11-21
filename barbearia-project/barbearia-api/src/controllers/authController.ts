// src/controllers/authController.ts
import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export class AuthController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authService = new AuthService();

    try {
      const auth = await authService.execute({
        email,
        password
      });

      return res.json(auth);

    } catch (err) {
      return res.status(401).json({ 
        error: err instanceof Error ? err.message : "Authentication failed"
      });
    }
  }
}