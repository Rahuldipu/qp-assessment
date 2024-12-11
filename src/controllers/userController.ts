import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/userService';
import { successResponse, errorResponse } from '../utils/responseUtils';
import { MESSAGES } from '../constants/responses';

export const viewGroceries = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const groceries = await userService.viewGroceries();
        successResponse(res, MESSAGES.ALL_GROCERY, { groceries });
    } catch (err) {
        next(err); // Forward the error to the error handler
    }
};

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req;
        if (!user) {
            throw new Error('User not found');
        }

        const { items } = req.body;
        if (!items || !Array.isArray(items) || items.length === 0) {
            throw new Error('Invalid items provided');
        }

        const orderData = {
            userId: user.id,
            items,
        };

        const order = await userService.createOrder(orderData);
        successResponse(res, MESSAGES.ORDER_CREATED, { order });
    } catch (err) {
        next(err); // Forward the error to the error handler
    }
};

export const getUserOrders = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { user } = req;
        if (!user) {
            throw new Error('User not found');
        }

        const orders = await userService.getUserOrders(user.id);

        successResponse(res, MESSAGES.ORDERS_FETCHED, orders);
    } catch (error) {
        next(error); // Forward the error to the error-handling middleware
    }
};
