import prisma from '../../config/prisma';

interface ServiceRequest {
  name: string;
  price: number; 
  duration: number; 
}

export class CreateServiceService {
  async execute({ name, price, duration }: ServiceRequest) {
    
    const serviceAlreadyExists = await prisma.service.findFirst({
      where: {
        name: name
      }
    });

    if (serviceAlreadyExists) {
      throw new Error("Service already exists");
    }

    const service = await prisma.service.create({
      data: {
        name: name,
        price: price,
        durationInMinutes: duration
      }
    });

    return service;
  }
}