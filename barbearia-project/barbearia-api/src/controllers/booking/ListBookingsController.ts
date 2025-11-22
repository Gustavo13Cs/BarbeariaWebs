import { Request, Response } from 'express';
import { ListBookingsService } from '../../services/booking/ListBookingsService';

export class ListBookingsController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;

    const listBookingsService = new ListBookingsService();

    const bookings = await listBookingsService.execute(user_id);

    return res.json(bookings);
  }
}