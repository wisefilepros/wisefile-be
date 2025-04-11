import bcrypt from 'bcrypt';
import { db } from '../db/index.js';

export const createPassword = async (req, res) => {
  const { user_id, password } = req.body;

  if (!user_id || !password) {
    return res
      .status(400)
      .json({ message: 'User ID and password are required.' });
  }

  const user = await db.getUserById(user_id);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const existing = await db.getPasswordByUserId(user_id);
  if (existing)
    return res
      .status(409)
      .json({ message: 'Password already set for this user.' });

  const hash = await bcrypt.hash(password, 10);
  await db.createPassword({ user_id, hash });

  res.status(201).json({ message: 'Password set successfully.' });
};

export const resetPassword = async (req, res) => {
  const { user_id, new_password } = req.body;

  if (!user_id || !new_password) {
    return res
      .status(400)
      .json({ message: 'User ID and new password are required.' });
  }

  const user = await db.getUserById(user_id);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  // Prevent resetting password for other roles unless you're admin or client
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Not authorized to reset passwords.' });
  }

  const hash = await bcrypt.hash(new_password, 10);
  const existing = await db.getPasswordByUserId(user_id);

  if (existing) {
    await db.updatePassword(existing._id, { hash });
  } else {
    await db.createPassword({ user_id, hash });
  }

  return res.sendStatus(204); // Password reset, no content
};

export const updateOwnPassword = async (req, res) => {
  const { current_password, new_password } = req.body;
  const user_id = req.user?._id;

  if (!current_password || !new_password) {
    return res
      .status(400)
      .json({ message: 'Both current and new password are required.' });
  }

  const passwordRecord = await db.getPasswordByUserId(user_id);
  if (!passwordRecord) {
    return res.status(404).json({ message: 'Password not set for this user.' });
  }

  const isMatch = await bcrypt.compare(current_password, passwordRecord.hash);
  if (!isMatch) {
    return res.status(401).json({ message: 'Current password is incorrect.' });
  }

  const newHash = await bcrypt.hash(new_password, 10);
  await db.updatePassword(passwordRecord._id, { hash: newHash });

  res.status(200).json({ message: 'Password updated successfully.' });
};

export const deletePassword = async (req, res) => {
  try {
    const deleted = await db.deletePassword(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Password not found' });
    }
    res.status(204).send();
  } catch (err) {
    console.error('Error deleting password:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
