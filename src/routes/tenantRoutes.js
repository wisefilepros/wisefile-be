import express from 'express';
import * as controller from '../controllers/tenantController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllTenants);
router.get('/:id', requireAuth, controller.getTenantById);
router.post('/', requireAuth, controller.createTenant);
router.patch('/:id', requireAuth, controller.updateTenant);
router.delete('/:id', requireAuth, controller.deleteTenant);

export default router;
