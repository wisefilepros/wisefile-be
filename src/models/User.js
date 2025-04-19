import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const UserDefinition = {
  full_name: { type: String, required: true },
  email: { type: String, required: true },
  role: {
    type: String,
    enum: ['admin', 'client', 'attorney', 'operations'],
    required: true,
  },
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  is_active: { type: Boolean, default: true },
  phone_number: { type: String, default: '' },
  last_login: { type: Date, default: Date.now },
  email_verified: { type: Boolean, default: false },
  two_factor_enabled: { type: Boolean, default: false },
  profile_picture_url: { type: String, default: '' },
  preferences: { type: Object, default: {} },
  notifications: { type: [String], default: [] },
};

const UserSchema = createSchema(UserDefinition);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ client_id: 1 });
UserSchema.index({ role: 1 });

export const User = mongoose.model('User', UserSchema);
