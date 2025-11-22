import prisma from '../../config/prisma';

export class ListBookingsService {
  async execute(user_id: string) {
    
    const bookings = await prisma.booking.findMany({
      where: {
        userId: user_id 
      },
      orderBy: {
        startTime: 'asc' 
      },
      include: {
        service: true, 
        user: {       
            select: {
                id: true,
                name: true,
                email: true
            }
        } 
      }
    });

    return bookings;
  }
}