import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/authService';
import { successResponse } from '../utils/responseUtils';
import { MESSAGES } from '../constants/responses';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    return successResponse(res, MESSAGES.LOGIN_SUCCESS, { token });
  } catch (err) {
    next(err)
  }

};

export const signup = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { username, password, role } = req.body;
    const user = await authService.signup(username, password, role);
    return successResponse(res, MESSAGES.SIGNUP_SUCCESS, { user });
  } catch (err) {
    next(err)
  }

};
