import { Router } from 'express';
import { Route } from '~/core/interfaces';
import IndexController from '~/modules/index/index.controller';

class IndexRoute implements Route {
  public path = '/';
  public router = Router();
  private indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get(`${this.path}`, this.indexController.index);
  }
}

export default IndexRoute;
