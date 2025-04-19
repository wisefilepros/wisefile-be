import express from 'express';
import * as controller from '../controllers/messageController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllMessages);
router.get('/by-case', requireAuth, controller.getMessagesByQuery);
router.patch('/mark-read', requireAuth, controller.markMultipleMessagesAsRead);
router.get('/:id', requireAuth, controller.getMessageById);
router.post('/', requireAuth, controller.createMessage);
router.patch('/:id', requireAuth, controller.updateMessage);
router.delete('/:id', requireAuth, controller.deleteMessage);
router.patch('/:id/mark-read', requireAuth, controller.markMessageAsRead);

export default router;
