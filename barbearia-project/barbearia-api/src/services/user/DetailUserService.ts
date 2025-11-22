import prisma from '../../config/prisma';

export class DetailUserService {
  async execute(user_id: string) {
    
    const user = await prisma.user.findUnique({
      where: {
        id: user_id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true 
      }
    });

    return user;
  }
}