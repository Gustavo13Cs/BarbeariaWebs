import prisma from '../../config/prisma';

export class ListServicesService {
  async execute() {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        durationInMinutes: true
      }
    });

    return services;
  }
}