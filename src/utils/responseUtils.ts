import { Response } from 'express';

export const successResponse = (res: Response, message: string, data: any = null) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (res: Response, message: string, statusCode: number = 500) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};