import { Request, Response } from 'express';
import { CreateServiceService } from '../../services/service/CreateServiceService';

export class CreateServiceController {
  async handle(req: Request, res: Response) {
    const { name, price, duration } = req.body;

    const createServiceService = new CreateServiceService();

    try {
      const service = await createServiceService.execute({
        name,
        price,
        duration
      });

      return res.json(service);

    } catch (err) {
      return res.status(400).json({ 
        error: err instanceof Error ? err.message : "Error creating service" 
      });
    }
  }
}