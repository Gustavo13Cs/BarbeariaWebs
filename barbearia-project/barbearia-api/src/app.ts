import 'dotenv/config';
import express from 'express';
import { userRoutes } from './routes/userRoutes';
import { authRoutes } from './routes/authRoutes';

class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }

  private routes(): void {
    this.server.get('/', (req, res) => {
      return res.json({ message: 'API da Barbearia está no ar!' });
    });

    this.server.use('/users', userRoutes); 
    this.server.use('/auth', authRoutes);
  }
}

export default new App().server;