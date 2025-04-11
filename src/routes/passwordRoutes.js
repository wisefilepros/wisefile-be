import express from 'express';
import * as controller from '../controllers/passwordController.js';
import { requireAuth } from '../middleware/requireAuth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = express.Router();

router.post('/', controller.createPassword);
router.post(
  '/reset',
  requireAuth,
  requireRole('admin'),
  controller.resetPassword
);
router.post('/update', requireAuth, controller.updateOwnPassword);

export default router;
