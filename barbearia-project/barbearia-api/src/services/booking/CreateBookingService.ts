import prisma from '../../config/prisma';

interface BookingRequest {
  user_id: string;
  service_id: string;
  date: Date; 
}

export class CreateBookingService {
  async execute({ user_id, service_id, date }: BookingRequest) {
    
    const bookingAlreadyExists = await prisma.booking.findFirst({
      where: {
        startTime: date,
      }
    });

    if (bookingAlreadyExists) {
      throw new Error("Este horário já está reservado.")    
    }
    const serviceExists = await prisma.service.findUnique({
      where: { id: service_id }
    });

    if (!serviceExists) {
        throw new Error("Service not found");
    }
    const booking = await prisma.booking.create({
      data: {
        userId: user_id,
        serviceId: service_id,
        startTime: date,
      }
    });

    return booking;
  }
}