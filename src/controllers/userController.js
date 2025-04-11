import { db } from '../db/index.js';
import { logActivity } from '../utils/logActivity.js';

export const getAllUsers = async (req, res) => {
  try {
    const users = await db.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await db.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('Error fetching user by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createUser = async (req, res) => {
  const { full_name, role, email, phone_number } = req.body;

  if (!full_name || !role || !email || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = await db.createUser({
      full_name,
      role,
      email,
      phone_number,
    });

    await logActivity({
      user_id: req.user._id,
      action: 'create',
      entity_type: 'user',
      entity_id: newUser._id,
      details: `Created user ${newUser.full_name} (${newUser.role})`,
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updated = await db.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: 'User not found' });

    await logActivity({
      user_id: req.user._id,
      action: 'update',
      entity_type: 'user',
      entity_id: req.params.id,
      details: `Updated user ${updated.full_name}`,
    });

    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleted = await db.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });

    await logActivity({
      user_id: req.user._id,
      action: 'delete',
      entity_type: 'user',
      entity_id: req.params.id,
      details: `Deleted user with ID ${req.params.id}`,
    });

    res.status(200).json({ message: 'User deleted' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
