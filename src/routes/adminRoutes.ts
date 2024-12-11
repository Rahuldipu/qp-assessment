import express from 'express';
import * as adminController from '../controllers/adminController';
import { verifyToken, adminOnly } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/grocery', verifyToken, adminOnly, adminController.addGrocery);
router.get('/grocery', verifyToken, adminOnly, adminController.viewGroceries);
router.put('/grocery/:id', verifyToken, adminOnly, adminController.updateGrocery);
router.delete('/grocery/:id', verifyToken, adminOnly, adminController.deleteGrocery);
router.put('/inventory', verifyToken, adminOnly, adminController.manageInventory);

export default router;
