import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { CreateBookingController } from '../controllers/booking/CreateBookingController';
import { ListBookingsController } from '../controllers/booking/ListBookingsController';

const bookingRoutes = Router();
const createBookingController = new CreateBookingController();
const listBookingsController = new ListBookingsController()

bookingRoutes.use(isAuthenticated);

bookingRoutes.post('/', createBookingController.handle);
bookingRoutes.get('/', listBookingsController.handle);

export { bookingRoutes };