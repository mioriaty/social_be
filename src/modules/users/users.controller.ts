import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import RegisterDTO from '~/modules/users/dtos/register.dto';
import UsersService from '~/modules/users/users.service';

class UsersController {
  private userService = new UsersService();

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log('req.body', req.body);
    try {
      const model: RegisterDTO = req.body;
      const tokenData = await this.userService.createUser(model);
      res.status(StatusCodes.CREATED).json(tokenData);
    } catch (error) {
      next(error as Error);
    }
  };
}

export default UsersController;
