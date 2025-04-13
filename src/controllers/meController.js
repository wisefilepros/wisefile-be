export const getCurrentUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    res.status(200).json(req.user);
  } catch (err) {
    console.error('Failed to fetch current user:', err);
    res.status(500).json({ message: 'Failed to fetch current user' });
  }
};
