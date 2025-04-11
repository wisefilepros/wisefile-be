import express from 'express';
import * as controller from '../controllers/userController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllUsers);
router.get('/:id', requireAuth, controller.getUserById);
// router.post('/', requireAuth, controller.createUser);
router.post('/', controller.createUser);
router.patch('/:id', requireAuth, controller.updateUser);
router.delete('/:id', requireAuth, controller.deleteUser);

export default router;
