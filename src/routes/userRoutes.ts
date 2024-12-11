import express from 'express';
import * as userController from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/grocery', verifyToken, userController.viewGroceries);
router.post('/order', verifyToken, userController.createOrder);
router.get('/order', verifyToken, userController.getUserOrders);

export default router;
