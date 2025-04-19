import mongoose from 'mongoose';
import { createSchema } from './baseSchema.js';

const PasswordDefinition = {
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  hash: { type: String, required: true },
};

const PasswordSchema = createSchema(PasswordDefinition);

PasswordSchema.index({ user_id: 1 }, { unique: true });

export const Password = mongoose.model('Password', PasswordSchema);
