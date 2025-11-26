import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { CreateBookingController } from '../controllers/booking/CreateBookingController';
import { ListBookingsController } from '../controllers/booking/ListBookingsController';
import { CancelBookingController } from '../controllers/booking/CancelBookingController';

const bookingRoutes = Router();
const createBookingController = new CreateBookingController();
const listBookingsController = new ListBookingsController();
const cancelBookingController = new CancelBookingController();

bookingRoutes.use(isAuthenticated);

bookingRoutes.post('/', createBookingController.handle);
bookingRoutes.get('/', listBookingsController.handle);
bookingRoutes.delete('/', cancelBookingController.handle);

export { bookingRoutes };