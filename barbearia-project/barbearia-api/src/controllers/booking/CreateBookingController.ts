import { Request, Response } from 'express';
import { CreateBookingService } from '../../services/booking/CreateBookingService';

export class CreateBookingController {
  async handle(req: Request, res: Response) {
    const { service_id, date } = req.body;
    
    const user_id = req.user_id;

    const createBookingService = new CreateBookingService();

    try {
      const booking = await createBookingService.execute({
        user_id,
        service_id,
        date: new Date(date) 
      });

      return res.json(booking);

    } catch (err) {
      return res.status(400).json({ 
        error: err instanceof Error ? err.message : "Error creating booking" 
      });
    }
  }
}