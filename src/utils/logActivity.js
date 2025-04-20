import { db } from '../db/index.js';

export const logActivity = async ({
  user_id,
  action,
  entity_type,
  entity_id,
  details,
}) => {
  try {
    await db.activityLogs.createActivityLog({
      user_id,
      action,
      entity_type,
      entity_id,
      details,
      timestamp: new Date(),
    });
  } catch (err) {
    console.error('⚠️ Failed to log activity:', err);
  }
};
