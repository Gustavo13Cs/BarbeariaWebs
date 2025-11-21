import prisma from '../config/prisma';
import { hash } from 'bcryptjs'; 

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export class UserService {
  async execute({ name, email, password }: CreateUserRequest) {
    
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email: email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Email already exists"); 
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: passwordHash, 
      },
      select: {
        id: true,
        name: true,
        email: true,
      }
    });

    return user;
  }
}