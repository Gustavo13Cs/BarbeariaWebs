import { Request, Response } from 'express';
import { CancelBookingService } from '../../services/booking/CancelBookingService';

export class CancelBookingController {
  async handle(req: Request, res: Response) {
    const user_id = req.user_id;
    const booking_id = req.query.booking_id as string;

    if (!booking_id) {
      return res.status(400).json({ error: "Booking ID is required" });
    }

    const cancelBookingService = new CancelBookingService();

    try {
      await cancelBookingService.execute({
        user_id,
        booking_id
      });

      return res.json({ message: "Canceled successfully" });

    } catch (err) {
      return res.status(400).json({ 
        error: err instanceof Error ? err.message : "Error cancelling booking" 
      });
    }
  }
}