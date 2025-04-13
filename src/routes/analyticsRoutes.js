import express from 'express';
import { getCaseAnalytics } from '../controllers/analyticsController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/cases', requireAuth, getCaseAnalytics);

export default router;
