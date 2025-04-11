import express from 'express';
import * as controller from '../controllers/documentController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllDocuments);
router.get('/:id', requireAuth, controller.getDocumentById);
router.post('/', requireAuth, controller.createDocument);
router.patch('/:id', requireAuth, controller.updateDocument);
router.delete('/:id', requireAuth, controller.deleteDocument);

export default router;
