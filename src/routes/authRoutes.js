import express from 'express';
import { loginUser, refreshToken } from '../controllers/authController.js';

const router = express.Router();

router.post('/login', loginUser);
router.post('/refresh', refreshToken);

export default router;
