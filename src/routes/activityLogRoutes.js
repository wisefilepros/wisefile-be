import express from 'express';
import * as controller from '../controllers/activityLogController.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', requireAuth, controller.getAllActivityLogs);

export default router;
