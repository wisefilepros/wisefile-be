import express from 'express';
import * as controller from '../controllers/caseRecordController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllCaseRecords);
router.get('/:id', requireAuth, controller.getCaseRecordById);
router.post('/', requireAuth, controller.createCaseRecord);
router.patch('/:id', requireAuth, controller.updateCaseRecord);
router.delete('/:id', requireAuth, controller.deleteCaseRecord);

export default router;
