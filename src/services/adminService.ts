import Grocery from '../models/grocery';
import { NotFoundError } from '../utils/errorUtils';

export const addGrocery = async (data: any) => {
  const grocery = await Grocery.create(data);
  return grocery;
};

export const viewGroceries = async () => {
  const groceries = await Grocery.findAll();
  return groceries;
};

export const updateGrocery = async (id: string, data: any) => {
  const grocery = await Grocery.findByPk(id);
  if (!grocery) {
    throw new NotFoundError('Grocery not found');
  }
  await grocery.update(data);
  return grocery;
};

export const deleteGrocery = async (id: string) => {
  const grocery = await Grocery.findByPk(id);
  if (!grocery) {
    throw new NotFoundError('Grocery not found');
  }
  await grocery.destroy();
};

export const manageInventory = async (id: string, stock: number) => {
  const grocery = await Grocery.findByPk(id);

  if (!grocery) {
    throw new NotFoundError('Grocery item not found');
  }

  grocery.stock += stock;
  await grocery.save();

  return grocery;
};
