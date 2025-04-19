import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PasswordDefinition = {
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  hash: { type: String, required: true },
};

passwordSchema.index({ user_id: 1 }, { unique: true });

const PasswordSchema = createSchema(PasswordDefinition);
export const Password = mongoose.model('Password', PasswordSchema);
