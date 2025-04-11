import express from 'express';
import * as controller from '../controllers/authController.js';

const router = express.Router();

router.post('/login', controller.loginUser);
router.post('/refresh', controller.refreshToken);
router.post('/logout', controller.logoutUser);

export default router;
