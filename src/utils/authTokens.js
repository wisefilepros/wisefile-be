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

export function setAuthCookies(res, { accessToken, refreshToken }) {
  const cookieOptions = {
    httpOnly: true,
    secure: true, 
    sameSite: 'None',
    path: '/',
  };

  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 60 * 60 * 1000, // 1 hour
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export const clearAuthCookies = (res) => {
  res.clearCookie('refreshToken');
};
