import { Router } from 'express';
import { Route } from '~/core/interfaces';
import { validationMiddleware } from '~/core/middleware';

import RegisterDTO from '~/modules/users/dtos/register.dto';
import UsersController from '~/modules/users/users.controller';

class UserRoute implements Route {
  public path = '/api/users';
  public router = Router();
  private usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(
      this.path,
      validationMiddleware(RegisterDTO, true),
      this.usersController.register
    );
  }
}

export default UserRoute;
