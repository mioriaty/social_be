import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { HTTPException } from '~/core/exceptions';
import { Logger } from '~/core/utils';

const errorHandlerMiddleware = async (
  error: HTTPException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = error.message || 'Something went wrong';

  Logger.error(`[ERROR] - Status: ${status} - Message: ${message}`);

  res.status(status).json({ message });
};

export default errorHandlerMiddleware;
