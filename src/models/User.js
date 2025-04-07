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
  client_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Client',
    default: null,
  },
  is_active: { type: Boolean, default: true },
};

const UserSchema = createSchema(UserDefinition);
export const User = mongoose.model('User', UserSchema);
