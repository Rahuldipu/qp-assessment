import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { errorResponse } from '../utils/responseUtils';
import { MESSAGES } from '../constants/responses';
import { config } from '../config/env';

// Define a custom type for the decoded JWT
interface DecodedToken {
  id: string;
  role: string;
}

// Extend Express's Request object to include the `user` field
declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

// Middleware to verify token
export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return void errorResponse(res, MESSAGES.UNAUTHORIZED, 401);
  }

  try {
    const decoded = jwt.verify(token, config.SECRET_KEY) as DecodedToken;
    req.user = decoded; // Attach decoded token data to the request object
    next();
  } catch (err) {
    return void errorResponse(res, MESSAGES.UNAUTHORIZED, 401);
  }
};

// Middleware to restrict access to admin-only routes
export const adminOnly = (req: Request, res: Response, next: NextFunction): void => {
  if (req.user?.role !== 'admin') {
    return void errorResponse(res, MESSAGES.FORBIDDEN, 403);
  }
  next();
};
