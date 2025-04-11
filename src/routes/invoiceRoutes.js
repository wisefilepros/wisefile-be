import express from 'express';
import * as controller from '../controllers/invoiceController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllInvoice);
router.get('/:id', requireAuth, controller.getInvoiceById);
router.post('/', requireAuth, controller.createInvoice);
router.patch('/:id', requireAuth, controller.updateInvoice);
router.delete('/:id', requireAuth, controller.deleteInvoice);

export default router;
