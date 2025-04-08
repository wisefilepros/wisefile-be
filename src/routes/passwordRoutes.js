import express from 'express';
import {
  createPassword,
  resetPassword,
  updateOwnPassword,
} from '../controllers/passwordController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.post('/', createPassword);
router.post('/reset', requireAuth, requireRole('admin'), resetPassword);
router.post('/update', requireAuth, updateOwnPassword);

export default router;
