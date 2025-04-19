import express from 'express';
import { getAnalytics } from '../controllers/analyticsController.js';
import { exportCaseAnalytics } from '../controllers/exportCaseAnalytics.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/cases', requireAuth, getAnalytics);
router.get('/cases/export', requireAuth, exportCaseAnalytics);

export default router;
