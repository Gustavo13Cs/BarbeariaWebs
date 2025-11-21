import { Request, Response } from 'express';
import { UserService } from '../services/userService';

export class UserController {
  async handle(req: Request, res: Response) {

    const { name, email, password } = req.body;

    const userService = new UserService();

    try {
      const user = await userService.execute({
        name,
        email,
        password
      });

      return res.status(201).json(user);

    } catch (err) {
      return res.status(400).json({ 
        error: err instanceof Error ? err.message : "Error creating user" 
      });
    }
  }
}