import { fakeDb } from '../db.js';

export const getAllUsers = (req, res) => {
  const users = fakeDb.users;
  res.status(200).json(users);
};

export const getUserById = (req, res) => {
  const user = fakeDb.users.find((u) => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

export const createUser = (req, res) => {
  const { full_name, role, email, phone_number } = req.body;

  if (!full_name || !role || !email || !phone_number) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const newUser = fakeDb.createUser({
    full_name,
    role,
    email,
    phone_number,
  });
  res.status(201).json(newUser);
};
