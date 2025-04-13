import express from 'express';
import { CASE_STATUSES } from '../utils/caseStatusOptions.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/case-status-options', requireAuth, (req, res) => {
  res.status(200).json(CASE_STATUSES);
});

export default router;
