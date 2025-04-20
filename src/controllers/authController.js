import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { logActivity } from '../utils/logActivity.js';
import {
  createAccessToken,
  createRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from '../utils/authTokens.js';
import { db } from '../db/index.js';

const generateTokenPair = (user) => {
  const accessToken = createAccessToken(user);
  const refreshToken = createRefreshToken(user);
  return { accessToken, refreshToken };
};

export const registerUser = async (req, res) => {
  try {
    const skipAuth = (await db.users.getAllUsers()).length === 0;

    if (!skipAuth && !req.user) {
      return res.status(401).json({ error: 'Authentication required.' });
    }

    const { full_name, email, role, client_id, password } = req.body;

    const existing = await db.users.getUserByEmail(email);
    if (existing) {
      return res.status(409).json({ error: 'User already exists.' });
    }

    const newUser = await db.users.createUser({
      full_name,
      email,
      role,
      client_id,
    });
    const hash = await bcrypt.hash(password, 10);
    await db.passwords.createPassword({ user_id: newUser._id, hash });

    logActivity({
      entity_id: newUser._id,
      entity_type: 'user',
      action: `Created user ${full_name}`,
      user_id: req.user?._id || newUser._id,
    });

    res.status(201).json({ message: 'User registered.', user: newUser });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Registration failed.' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.users.getUserByEmail(email);
    if (!user) return res.status(401).json({ error: 'User not found.' });

    const passwordData = await db.passwords.getPasswordByUserId(user._id);
    if (!passwordData)
      return res.status(401).json({ error: 'Password not set for user.' });

    const isMatch = await bcrypt.compare(password, passwordData.hash);
    if (!isMatch) return res.status(401).json({ error: 'Incorrect password.' });

    await db.users.updateUser(user._id, { last_login: new Date() });

    const tokens = generateTokenPair(user);
    await db.refreshTokens.createRefreshToken({
      user_id: user._id,
      token: tokens.refreshToken,
    });

    setAuthCookies(res, {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    });

    res.json({ user });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed.' });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies?.refreshToken;
    if (!token)
      return res.status(401).json({ error: 'No refresh token provided.' });

    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const user = await db.users.getUserById(decoded._id);

    const stored = await db.refreshTokens.getRefreshTokenByUserId(user._id);
    if (!stored || stored.token !== token) {
      return res.status(403).json({ error: 'Invalid refresh token.' });
    }

    const tokens = generateTokenPair(user);
    await db.refreshTokens.updateRefreshTokenByUserId(user._id, {
      token: tokens.refreshToken,
    });

    setAuthCookies(res, { refreshToken: tokens.refreshToken });
    res.json({ accessToken: tokens.accessToken });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(403).json({ error: 'Invalid or expired refresh token.' });
  }
};

export const logoutUser = async (req, res) => {
  try {
    clearAuthCookies(res);
    res.json({ message: 'Logged out.' });
  } catch (err) {
    console.error('Logout error:', err);
    res.status(500).json({ error: 'Logout failed.' });
  }
};
