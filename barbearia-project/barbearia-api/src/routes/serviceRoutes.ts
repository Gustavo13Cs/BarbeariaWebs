import { Router } from 'express';
import { isAuthenticated } from '../middleware/isAuthenticated';
import { CreateServiceController } from '../controllers/service/CreateServiceController';
import { ListServicesController } from '../controllers/service/ListServicesController';

const serviceRoutes = Router();

const createServiceController = new CreateServiceController();
const listServicesController = new ListServicesController();


serviceRoutes.use(isAuthenticated);

serviceRoutes.post('/', createServiceController.handle);
serviceRoutes.get('/', listServicesController.handle);

export { serviceRoutes };