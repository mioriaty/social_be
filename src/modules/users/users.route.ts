import { Router } from 'express';
import { Route } from '~/core/interfaces';
import UsersController from '~/modules/users/users.controller';

class UserRoute implements Route {
  public path = '/api/users';
  public router = Router();
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.usersController.register);
  }
}

export default UserRoute;
