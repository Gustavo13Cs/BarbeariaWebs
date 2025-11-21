import prisma from '../config/prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
  email: string;
  password: string;
}

export class AuthService {
  async execute({ email, password }: AuthRequest) {
    
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (!user) {
      throw new Error("Email or password incorrect");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect");
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
        role: user.role 
      }, 
      "super-secret-key-barbearia", 
      {
        subject: user.id, 
        expiresIn: '30d' 
      }
    );

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token
    };
  }
}