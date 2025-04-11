import { db } from '../db/index.js';
import { logActivity } from './logActivity.js';

export const deleteUserAndCredentials = async (userId, actorUserId) => {
  const deleted = await db.deleteUser(userId);
  if (!deleted) return false;

  await db.deletePassword(userId);
  await db.deleteRefreshToken(userId);

  await logActivity({
    user_id: actorUserId,
    action: 'delete',
    entity_type: 'user',
    entity_id: userId,
    details: `Deleted user ${userId} and their credentials`
  });

  return true;
};
