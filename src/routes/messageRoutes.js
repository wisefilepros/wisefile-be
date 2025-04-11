import express from 'express';
import * as controller from '../controllers/messageController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllMessage);
router.get('/:id', requireAuth, controller.getMessageById);
router.post('/', requireAuth, controller.createMessage);
router.patch('/:id', requireAuth, controller.updateMessage);
router.delete('/:id', requireAuth, controller.deleteMessage);

export default router;
