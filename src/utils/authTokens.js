import jwt from 'jsonwebtoken';

export const createAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      role: user.role,
      client_id: user.client_id,
      full_name: user.full_name,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

export const createRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
};

export const setAuthCookies = (res, { refreshToken }) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
  });
};

export const clearAuthCookies = (res) => {
  res.clearCookie('refreshToken');
};