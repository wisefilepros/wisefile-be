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
