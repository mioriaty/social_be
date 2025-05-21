import { NextFunction, Request, Response, RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTPException } from '~/core/exceptions';

import AuthService from '~/modules/auth/auth.service';
import LoginDTO from '~/modules/auth/dtos/login.dto';

class AuthController {
  private authService = new AuthService();

  public login: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const model: LoginDTO = req.body;
      const tokenData = await this.authService.login(model);
      res.status(StatusCodes.OK).json(tokenData);
    } catch (error) {
      next(error as Error);
    }
  };

  public getCurrentUser: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const user = req.user;

      if (!user) {
        throw new HTTPException(StatusCodes.UNAUTHORIZED, 'User not found');
      }

      const currentUser = await this.authService.getCurrentUser(user.id);

      res.status(StatusCodes.OK).json(currentUser);
    } catch (error) {
      next(error as Error);
    }
  };
}

export default AuthController;
