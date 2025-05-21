import { Router } from 'express';
import { Route } from '~/core/interfaces';
import { authMiddleware } from '~/core/middleware';
import AuthController from '~/modules/auth/auth.controller';

class AuthRoute implements Route {
  public path = '/api/auth';
  public router = Router();
  private authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post(this.path, this.authController.login);
    this.router.get(this.path, authMiddleware, this.authController.getCurrentUser);
  }
}

export default AuthRoute;
