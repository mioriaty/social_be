import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(StatusCodes.OK).json({ message: 'Welcome to the API' });
    } catch (error) {
      next(error as Error);
    }
  };
}

export default IndexController;
