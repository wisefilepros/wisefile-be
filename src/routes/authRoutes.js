import express from 'express';
import * as controller from '../controllers/authController.js';
import { getCurrentUser } from '../controllers/meController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/login', controller.loginUser);
router.post('/refresh', controller.refreshToken);
router.post('/logout', controller.logoutUser);
router.get('/me', requireAuth, getCurrentUser);

export default router;
