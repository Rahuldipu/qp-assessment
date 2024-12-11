import Grocery from '../models/grocery';
import Order from '../models/order';
import { NotFoundError } from '../utils/errorUtils';

export const viewGroceries = async () => {
  const groceries = await Grocery.findAll();
  return groceries;
};

export const createOrder = async (orderData: { userId: string; items: { id: string; quantity: number }[] }) => {
  const { items, userId } = orderData;

  // Fetch groceries based on the item IDs
  const groceries = await Grocery.findAll({
    where: {
      id: items.map((item) => item.id),
    },
  });

  if (groceries.length !== items.length) {
    throw new NotFoundError('One or more groceries not found');
  }

  // Ensure stock is sufficient for each grocery item
  for (const grocery of groceries) {
    const item = items.find((i) => i.id === grocery.id);
    if (item && grocery.stock < item.quantity) {
      throw new Error(`Insufficient stock for grocery: ${grocery.name}`);
    }
  }

  // Calculate total amount for the order
  const totalAmount = groceries.reduce((sum, grocery) => {
    const item = items.find((i) => i.id === grocery.id);
    return sum + (item ? item.quantity * grocery.price : 0);
  }, 0);

  // Update stock for each grocery item
  await Promise.all(
    groceries.map((grocery) => {
      const item = items.find((i) => i.id === grocery.id);
      if (item) {
        return grocery.update({ stock: grocery.stock - item.quantity });
      }
    })
  );

  // Create the order, storing `items` as JSON
  const order = await Order.create({
    userId,
    items,
    totalAmount,
  });

  return order;
};

export const getUserOrders = async (userId: string) => {
  const orders = await Order.findAll({
    where: { userId }
  });

  if (!orders || orders.length === 0) {
    throw new Error('No orders found for this user');
  }

  return orders;
};
