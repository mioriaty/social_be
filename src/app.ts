import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import { Route } from '~/core/interfaces';
import { Logger } from '~/core/utils';
import { errorHandlerMiddleware } from '~/core/middleware';

class App {
  public app: express.Application;
  public port: string | number;
  public isProduction: boolean;

  constructor(routes: Route[]) {
    this.app = express();
    this.port = process.env.PORT || 4000;

    this.isProduction = process.env.NODE_ENV === 'production';

    this.initializeRoutes(routes);
    this.connectToDatabase();
    this.initializeMiddleware();
  }

  private initializeRoutes(routes: Route[]) {
    routes.forEach(route => {
      this.app.use(route.path, route.router);
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      Logger.info(`Server is running on port ${this.port}`);
    });
  }

  private async connectToDatabase() {
    const connectionString = process.env.MONGO_URL;

    if (!connectionString) {
      Logger.error('MongoDB connection string is not defined');
      process.exit(1);
    }

    await mongoose.connect(connectionString).catch(error => Logger.error(error));

    Logger.info('Connected to MongoDB');
  }

  private initializeMiddleware() {
    if (this.isProduction) {
      this.app.use(hpp());
      this.app.use(helmet());
      this.app.use(morgan('combined'));
      this.app.use(cors({ credentials: true, origin: 'your.domain.com' }));
    } else {
      this.app.use(morgan('dev'));
      this.app.use(cors({ credentials: true, origin: true }));
    }

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(errorHandlerMiddleware);
  }
}

export default App;
