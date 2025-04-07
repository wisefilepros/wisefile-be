// src/models/User.js
import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const UserDefinition = {
  full_name: String,
  email: { type: String, unique: true, required: true },
  role: {
    type: String,
    enum: ['admin', 'client', 'attorney', 'operations'],
    required: true,
  },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  is_active: { type: Boolean, default: true },
  phone_number: String,
  last_login: Date,
  email_verified: { type: Boolean, default: false },
  two_factor_enabled: { type: Boolean, default: false },
  profile_picture_url: String,
  preferences: { type: Object, default: {} },
  notifications: [String],
};

const UserSchema = createSchema(UserDefinition);
export const User = mongoose.model('User', UserSchema);
