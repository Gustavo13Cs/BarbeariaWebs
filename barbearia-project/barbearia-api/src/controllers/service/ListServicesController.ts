import { Request, Response } from 'express';
import { ListServicesService } from '../../services/service/ListServicesService';

export class ListServicesController {
  async handle(req: Request, res: Response) {
    const listServicesService = new ListServicesService();

    const services = await listServicesService.execute();

    return res.json(services);
  }
}