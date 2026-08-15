import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../controllers/product.controller';
import { authCheck } from '../middlewares/authCheck';
import { requireRole } from '../middlewares/requireRole';

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authCheck, requireRole('admin'), createProduct);
router.put('/:id', authCheck, requireRole('admin'), updateProduct);
router.delete('/:id', authCheck, requireRole('admin'), deleteProduct);

export default router;
