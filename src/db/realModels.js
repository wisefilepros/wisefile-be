import UserModel from '../models/User.js';

export const createUser = (data) => UserModel.create(data);
export const getUserById = (id) => UserModel.findById(id);
export const getAllUsers = () => UserModel.find();
export const updateUser = (id, updates) =>
  UserModel.findByIdAndUpdate(id, updates, { new: true });
export const deleteUser = (id) => UserModel.findByIdAndDelete(id);

// Do the same for other models...
