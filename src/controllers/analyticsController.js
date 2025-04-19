import { db } from '../db/index.js';

export const getAnalytics = async (req, res) => {
  try {
    const analytics = await db.analytics.getAnalyticsSummaryForUser(req.user);
    res.json(analytics);
  } catch (err) {
    console.error('Failed to generate analytics:', err);
    res.status(500).json({ error: 'Failed to generate analytics' });
  }
};
