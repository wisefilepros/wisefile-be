import express from 'express';
import * as controller from '../controllers/clientController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllClient);
router.get('/:id', requireAuth, controller.getClientById);
router.post('/', requireAuth, controller.createClient);
router.patch('/:id', requireAuth, controller.updateClient);
router.delete('/:id', requireAuth, controller.deleteClient);

export default router;
