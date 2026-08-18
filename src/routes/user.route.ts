import express from 'express';
const router = express.Router();
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from '../controllers/user.controller';
import { requireRole } from '../middlewares/requireRole';
import { userCheck } from '../middlewares/userCheck';

router.get('/', requireRole('admin'), getAllUsers);
router.post('/', createUser);
router.get('/:id', userCheck, getUserById);
router.put('/:id', userCheck, updateUser);
router.delete('/:id', userCheck, deleteUser);

export default router;
