import express from 'express';
import * as controller from '../controllers/propertyController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllProperties);
router.get('/:id', requireAuth, controller.getPropertyById);
router.post('/', requireAuth, controller.createProperty);
router.patch('/:id', requireAuth, controller.updateProperty);
router.delete('/:id', requireAuth, controller.deleteProperty);

export default router;
