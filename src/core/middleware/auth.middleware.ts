import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import jsonwebtoken from 'jsonwebtoken';
import { DataStoreInToken } from '~/modules/auth';

const authMiddleware: RequestHandler = (req, res, next) => {
  const token = req.headers['x-auth-token'] as string;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jsonwebtoken.verify(token, process.env.JWT_TOKEN_SECRET!) as DataStoreInToken;

    if (!req.user) {
      req.user = { id: '' };
    }

    req.user.id = decoded.id;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;
