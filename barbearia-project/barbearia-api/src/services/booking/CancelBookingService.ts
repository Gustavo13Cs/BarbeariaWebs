import prisma from '../../config/prisma';

interface CancelRequest {
  user_id: string;
  booking_id: string;
}

export class CancelBookingService {
  async execute({ user_id, booking_id }: CancelRequest) {
    
    const booking = await prisma.booking.findFirst({
      where: {
        id: booking_id,
        userId: user_id 
      }
    });

    if (!booking) {
      throw new Error("Booking not found or does not belong to you.");
    }
    await prisma.booking.delete({
      where: {
        id: booking_id
      }
    });

    return { message: "Booking canceled successfully" };
  }
}