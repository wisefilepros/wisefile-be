import express from 'express';
import { getDashboardMetrics } from '../controllers/dashboardController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, getDashboardMetrics);

export default router;
