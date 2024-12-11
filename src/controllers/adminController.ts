import { Request, Response, NextFunction } from 'express';
import * as adminService from '../services/adminService';
import { successResponse, errorResponse } from '../utils/responseUtils';
import { MESSAGES } from '../constants/responses';

export const addGrocery = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, price, stock, description } = req.body;  // Extracting data from the body
    const groceryData = { name, price, stock, description }; // can modify as per need
    const grocery = await adminService.addGrocery(groceryData);  // Passing the extracted data
    return successResponse(res, MESSAGES.GROCERY_ADDED_SUCCESS, grocery);
  } catch (error) {
    next(error);
  }
};

export const viewGroceries = async (_req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const groceries = await adminService.viewGroceries();
    return successResponse(res, MESSAGES.GROCERY_LIST_FETCHED_SUCCESS, groceries);
  } catch (error) {
    next(error);
  }
};

export const updateGrocery = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const { name, price, stock, description } = req.body;  // Extracting data from the body
    const groceryData = { name, price, stock, description }; // can modify as per need
    const updatedGrocery = await adminService.updateGrocery(req.params.id, groceryData); // Passing the extracted data
    return successResponse(res, MESSAGES.GROCERY_UPDATED_SUCCESS, updatedGrocery);
  } catch (error) {
    next(error);
  }
};

export const deleteGrocery = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    await adminService.deleteGrocery(req.params.id);
    return successResponse(res, MESSAGES.GROCERY_DELETED_SUCCESS);
  } catch (error) {
    next(error);
  }
};

export const manageInventory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id, stock } = req.body;

    if (typeof stock !== 'number' || stock < 0) {
      throw new Error('Invalid stock value. It must be a non-negative number.');
    }

    const updatedGrocery = await adminService.manageInventory(id, stock);

    successResponse(res, MESSAGES.INVENTORY_UPDATED_SUCCESS, updatedGrocery);
  } catch (error) {
    next(error);
  }
};
