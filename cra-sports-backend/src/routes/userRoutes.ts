import { Router } from 'express';
import { getMe } from '../controllers/userController';
import { protect } from '../middlewares/authMiddleware';

const router = Router();

router.get('/me', protect, getMe);

export default router; 