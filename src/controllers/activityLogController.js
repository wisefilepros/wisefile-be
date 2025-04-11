import { db } from '../db/index.js';
import { getActivityLogsForUser } from '../utils/filteredResults.js';

export const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await getActivityLogsForUser(req.user);
    res.status(200).json(logs);
  } catch (err) {
    console.error('Error fetching activity logs:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
