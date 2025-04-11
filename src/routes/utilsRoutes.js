import express from 'express';
import { US_COUNTIES_BY_STATE } from '../utils/usCountiesByState.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/counties', requireAuth, (req, res) => {
  const { state } = req.query;
  if (!state || !US_COUNTIES_BY_STATE[state]) {
    return res
      .status(400)
      .json({ message: 'Invalid or missing state abbreviation' });
  }
  res.status(200).json(US_COUNTIES_BY_STATE[state]);
});

export default router;
