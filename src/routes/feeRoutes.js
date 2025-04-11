import express from 'express';
import * as controller from '../controllers/feeController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllFee);
router.get('/:id', requireAuth, controller.getFeeById);
router.post('/', requireAuth, controller.createFee);
router.patch('/:id', requireAuth, controller.updateFee);
router.delete('/:id', requireAuth, controller.deleteFee);

export default router;
