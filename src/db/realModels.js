import { User } from '../models/User.js';
import { Password } from '../models/Password.js';
import { RefreshToken } from '../models/RefreshToken.js';

// User model operations
export const createUser = (data) => User.create(data);
export const getUserById = (id) => User.findById(id);
export const getAllUsers = () => User.find();
export const updateUser = (id, updates) =>
  User.findByIdAndUpdate(id, updates, { new: true });
export const deleteUser = (id) => User.findByIdAndDelete(id);

// Password model operations
export const createPassword = (item) => Password.create(item);
export const getPasswordByUserId = (userId) =>
  Password.findOne({ user_id: userId });
export const updatePassword = (id, updates) =>
  Password.findByIdAndUpdate(id, updates, { new: true });
export const deletePassword = (id) => Password.findByIdAndDelete(id);

// RefreshToken model operations
export const createRefreshToken = (item) => RefreshToken.create(item);
export const getRefreshTokenByUserId = (userId) =>
  RefreshToken.findOne({ user_id: userId });
export const updateRefreshToken = (userId, updates) =>
  RefreshToken.findOneAndUpdate({ user_id: userId }, updates, { new: true });
export const deleteRefreshToken = (userId) =>
  RefreshToken.findOneAndDelete({ user_id: userId });
