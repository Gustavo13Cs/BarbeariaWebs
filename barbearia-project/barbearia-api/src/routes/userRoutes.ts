import { Router } from 'express';
import { UserController } from '../controllers/userController';
import { DetailUserController } from '../controllers/user/DetailUserController'; 
import { isAuthenticated } from '../middleware/isAuthenticated'; 

const userRoutes = Router();
const userController = new UserController();
const detailUserController = new DetailUserController(); 


userRoutes.post('/', userController.handle);
userRoutes.get('/me', isAuthenticated, detailUserController.handle); 

export { userRoutes };