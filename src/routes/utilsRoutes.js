import express from 'express';
import { requireAuth } from '../middleware/requireAuth.js';
import { US_COUNTIES_BY_STATE } from '../utils/usCountiesByState.js';
import { CASE_STATUSES } from '../utils/caseStatusOptions.js';

const router = express.Router();

// County Lookup
router.get('/counties', requireAuth, (req, res) => {
  const { state } = req.query;
  if (!state || !US_COUNTIES_BY_STATE[state]) {
    return res
      .status(400)
      .json({ message: 'Invalid or missing state abbreviation' });
  }
  res.status(200).json(US_COUNTIES_BY_STATE[state]);
});

// Case Status Options
router.get('/case-status-options', requireAuth, (req, res) => {
  res.status(200).json(CASE_STATUSES);
});

export default router;
