import { NextFunction, Request, Response } from 'express';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction): void => {
    try {
      res.status(200).json({ message: 'Welcome to the API' });
    } catch (error) {
      next(error as Error);
    }
  };
}

export default IndexController;
