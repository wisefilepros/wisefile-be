import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken } from '../utils/authTokens.js';
import { db } from '../db/index.js';

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }

  // Find user by email
  const user = db.users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

  // Find hashed password in password store
  const pwRecord = db.passwords.find((p) => p.user_id === user._id);
  if (!pwRecord)
    return res.status(401).json({ message: 'Password not found.' });

  const match = await bcrypt.compare(password, pwRecord.hash);
  if (!match) return res.status(401).json({ message: 'Invalid credentials.' });

  // Create tokens
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);

  // Save refresh token to fake DB (real: store in DB)
  fakeDb.refresh_tokens.push({
    user_id: user._id,
    token: refreshToken,
    created_at: new Date(),
  });

  // Send as cookies
  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000, // 1 hour
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({
      message: 'Login successful',
      user: {
        _id: user._id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        client_id: user.client_id,
      },
    });
};
