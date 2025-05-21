import { NextFunction, Request, RequestHandler, Response } from 'express';
import { ValidationError, validate } from 'class-validator';

import { plainToInstance } from 'class-transformer';
import { HTTPException } from '~/core/exceptions';
import { StatusCodes } from 'http-status-codes';

const validationMiddleware = (type: any, skipMissingProperties = false): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    validate(plainToInstance(type, req.body), { skipMissingProperties }).then(
      (errors: ValidationError[]) => {
        if (errors.length > 0) {
          const messages = errors
            .map((error: ValidationError) => {
              return Object.values(error.constraints!);
            })
            .join(', ');
          next(new HTTPException(StatusCodes.BAD_REQUEST, messages));
        } else {
          next();
        }
      }
    );
  };
};

export default validationMiddleware;
