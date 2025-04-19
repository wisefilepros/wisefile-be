import bcrypt from 'bcrypt';
import { db } from '../db/index.js';

export async function initAdminUser() {
  const users = await db.users.getAllUsers();
  if (users.length > 0) return;

  console.log('🛠️ No users found — creating bootstrap admin user.');

  const full_name = process.env.ADMIN_NAME || 'Ben Burgos';
  const email = process.env.ADMIN_EMAIL || 'ben.a.burgos@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'changeMe123';

  const newUser = await db.users.createUser({
    full_name,
    email,
    role: 'admin',
  });

  const hash = await bcrypt.hash(password, 10);
  await db.passwords.createPassword({ user_id: newUser._id, hash });

  console.log(`✅ Admin user created: ${email}`);
}
