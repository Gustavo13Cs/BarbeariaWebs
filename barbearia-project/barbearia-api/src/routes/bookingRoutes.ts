import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { CreateBookingController } from '../controllers/booking/CreateBookingController';

const bookingRoutes = Router();
const createBookingController = new CreateBookingController();

bookingRoutes.use(isAuthenticated);

bookingRoutes.post('/', createBookingController.handle);

export { bookingRoutes };